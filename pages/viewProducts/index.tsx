import { collection, getDocs } from '@firebase/firestore';
import { query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase.config';
import DisplayProducts from '../../components/homePage/DisplayProducts';
import styles from '../../styles/viewProducts/ViewProducts.module.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import arrow from '../../public/arrow.svg';
import { useRouter } from 'next/router';

interface Paths {
	params: {
		id: string;
	};
}

interface Product {
	price: number;
	productName: string;
	brand: string;
	productType: string;
	description: string;
	id: string;
	imgUrl: string;
}

type Props = {
	products: Product[];
	sortingOption: string;
};

function ViewProducts({ products, sortingOption }: Props) {
	const router = useRouter();
	const { query } = router;

	const selectedFilter = sortingOption;
	const filterOptions = [
		'Alphabetically, A-Z',
		'Alphabetically, Z-A',
		'Price, low to high',
		'Price, high to low',
	];
	const [header, setHeader] = useState(query.productType);
	const [openFilter, setOpenFilter] = useState<boolean>(false);

	useEffect(() => {
		const handler = () => setOpenFilter(false);

		addEventListener('click', handler);
	});

	useEffect(() => {
		setHeader(query.productType);
	}, [query]);

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

	return (
		<div className={styles.viewProductContainer}>
			<div className={styles.headerLayout}>
				<div className={styles.header}>{header}</div>
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
					<div key={index}>
						<DisplayProducts product={product} />
					</div>
				))}
			</div>
		</div>
	);
}

export default ViewProducts;

export async function getServerSideProps(context: any) {
	const sort = context.query.sort || 'Alphabetically, A-Z';
	const productType = context.query.productType;

	const getCollection = collection(db, 'products');
	let q;

	if (sort === 'Alphabetically, A-Z') {
		q = query(
			getCollection,
			where('productType', '==', `${productType}`),
			orderBy('productName'),
		);
	} else if (sort === 'Alphabetically, Z-A') {
		q = query(
			getCollection,
			where('productType', '==', `${productType}`),
			orderBy('productName', 'desc'),
		);
	} else if (sort === 'Price, high to low') {
		q = query(
			getCollection,
			where('productType', '==', `${productType}`),
			orderBy('price', 'desc'),
		);
	} else {
		q = query(
			getCollection,
			where('productType', '==', `${productType}`),
			orderBy('price'),
		);
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
		},
	};
}
