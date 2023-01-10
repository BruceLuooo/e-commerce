import {
	collection,
	query,
	orderBy,
	getDocs,
	limit,
	getCountFromServer,
	startAfter,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DisplayProducts from '../../../components/homePage/DisplayProducts';
import { db } from '../../../firebase.config';
import styles from '../../../styles/viewCollection/ViewCollection.module.css';
import Image from 'next/image';
import arrow from '../../../public/arrow.svg';
import Head from 'next/head';

interface Product {
	price: number;
	productName: string;
	brand: string;
	productType: string;
	description: string;
	id: string;
	imgUrl: string;
	collection?: string;
}

type Props = {
	products: Product[];
	sortingOption: string;
	totalPages: number;
};

function viewAllCollection({ products, sortingOption, totalPages }: Props) {
	const router = useRouter();
	const { query } = router;

	const pages = Array.from({ length: totalPages }, (_, index) => {
		return index + 1;
	});

	const selectedFilter = sortingOption;
	const filterOptions = [
		'Alphabetically, A-Z',
		'Alphabetically, Z-A',
		'Price, low to high',
		'Price, high to low',
	];
	const [openFilter, setOpenFilter] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const handler = () => setOpenFilter(false);

		addEventListener('click', handler);
	});

	const filterSearch = (sort: string) => {
		query.sort = sort;

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};

	const selectSortOption = (product: string) => {
		filterSearch(product);
	};

	const openAndCloseSortingOptions = (e: any) => {
		e.stopPropagation();
		setOpenFilter(!openFilter);
	};

	const goToPage = (pageNumber: number) => {
		const number = pageNumber;
		query.page = number.toString();

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};

	return (
		<div className={styles.viewProductContainer}>
			<Head>
				<title>Maison Kobe | Collection</title>
			</Head>
			<div className={styles.headerLayout}>
				<div className={styles.header}>Complete Collection</div>
				<div className={styles.dropdownContainer}>
					<button
						className={`${styles.filterButton} ${
							openFilter && styles.filterButtonWide
						}`}
						onClick={openAndCloseSortingOptions}
					>
						<span className={styles.filterSelection}>{selectedFilter}</span>
						<span
							className={`${styles.filterArrow} ${
								openFilter && styles.filterOpen
							}`}
						>
							<Image
								src={arrow}
								alt={'open/close filter'}
								width={25}
								height={25}
							/>
						</span>
					</button>
					<div
						className={`${styles.dropdownMenu} ${openFilter && styles.visible}`}
					>
						{filterOptions.map((filter, index) => (
							<button
								key={index}
								className={`${styles.filterSelection} ${styles.filterOptions}`}
								onClick={() => selectSortOption(filter)}
							>
								{filter}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className={styles.viewProductsLayout}>
				{products.map((product, index) => (
					<div key={index} className={styles.product}>
						<DisplayProducts product={product} />
					</div>
				))}
			</div>
			<div className={styles.numberOfPages}>
				{pages.map((pageNumber, index) => (
					<button
						className={`${styles.pageButton} ${
							query.page === pageNumber.toString() && styles.pageSelectedActive
						} `}
						key={index}
						disabled={query.page === pageNumber.toString() ? true : false}
						onClick={() => goToPage(pageNumber)}
					>
						{pageNumber}
					</button>
				))}
			</div>
			<span className={styles.page}>Page</span>
		</div>
	);
}

export default viewAllCollection;

export async function getServerSideProps(context: any) {
	const sort = context.query.sort || 'Alphabetically, A-Z';
	const page = context.query.page - 1 || 0;

	const collectionRef = collection(db, 'products');
	const snapshot = await getCountFromServer(collectionRef);
	let q;

	if (sort === 'Alphabetically, A-Z') {
		if (page === 0) {
			q = query(collectionRef, orderBy('productName'), limit(6));
		} else {
			const currentPageQuery = query(
				collectionRef,
				orderBy('productName'),
				limit(6 * page),
			);
			const docSnap = await getDocs(currentPageQuery);
			const lastVisible = docSnap.docs[docSnap.docs.length - 1];

			q = query(
				collectionRef,
				orderBy('productName'),
				startAfter(lastVisible),
				limit(6),
			);
		}
	} else if (sort === 'Alphabetically, Z-A') {
		if (page === 0) {
			q = query(collectionRef, orderBy('productName', 'desc'), limit(6));
		} else {
			const currentPageQuery = query(
				collectionRef,
				orderBy('productName', 'desc'),
				limit(6 * page),
			);
			const docSnap = await getDocs(currentPageQuery);
			const lastVisible = docSnap.docs[docSnap.docs.length - 1];

			q = query(
				collectionRef,
				orderBy('productName', 'desc'),
				startAfter(lastVisible),
				limit(6),
			);
		}
	} else if (sort === 'Price, high to low') {
		if (page === 0) {
			q = query(collectionRef, orderBy('price', 'desc'), limit(6));
		} else {
			const currentPageQuery = query(
				collectionRef,
				orderBy('price', 'desc'),
				limit(6 * page),
			);
			const docSnap = await getDocs(currentPageQuery);
			const lastVisible = docSnap.docs[docSnap.docs.length - 1];

			q = query(
				collectionRef,
				orderBy('price', 'desc'),
				startAfter(lastVisible),
				limit(6),
			);
		}
	} else {
		if (page === 0) {
			q = query(collectionRef, orderBy('price'), limit(6));
		} else {
			const currentPageQuery = query(
				collectionRef,
				orderBy('price'),
				limit(6 * page),
			);
			const docSnap = await getDocs(currentPageQuery);
			const lastVisible = docSnap.docs[docSnap.docs.length - 1];

			q = query(
				collectionRef,
				orderBy('price'),
				startAfter(lastVisible),
				limit(6),
			);
		}
	}

	const docSnap = await getDocs(q);

	const allProductsRef: Product[] = [];

	docSnap.forEach((doc: any) => {
		allProductsRef.push(doc.data());
	});

	return {
		props: {
			products: allProductsRef,
			sortingOption: sort,
			totalPages: Math.ceil(snapshot.data().count / 6),
		},
	};
}
