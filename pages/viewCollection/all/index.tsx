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
import React from 'react';
import DisplayProducts from '../../../components/homePage/DisplayProducts';
import { db } from '../../../firebase.config';
import styles from '../../../styles/viewCollection/ViewCollection.module.css';
import Head from 'next/head';
import DropdownFilter from '../../../components/viewCollection/DropdownFilter';
import TotalPages from '../../../components/viewCollection/TotalPages';

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

function ViewAllCollection({ products, sortingOption, totalPages }: Props) {
	const router = useRouter();
	const { query } = router;

	const pages = Array.from({ length: totalPages }, (_, index) => {
		return index + 1;
	});

	const selectedFilter = sortingOption;

	return (
		<div className={styles.viewProductContainer}>
			<Head>
				<title>Maison Kobe | Collection</title>
			</Head>
			<div className={styles.headerLayout}>
				<div className={styles.header}>Complete Collection</div>
				<DropdownFilter selectedFilter={selectedFilter} />
			</div>
			<div className={styles.viewProductsLayout}>
				{products.map((product, index) => (
					<div key={index} className={styles.product}>
						<DisplayProducts product={product} />
					</div>
				))}
			</div>
			<TotalPages pages={pages} />
			<span className={styles.page}>Page</span>
		</div>
	);
}

export default ViewAllCollection;

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
