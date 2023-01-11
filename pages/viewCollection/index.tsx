import { collection, getDocs } from '@firebase/firestore';
import { query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase.config';
import DisplayProducts from '../../components/homePage/DisplayProducts';
import styles from '../../styles/viewCollection/ViewCollection.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import arrow from '../../public/arrow.svg';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DropdownFilter from '../../components/viewCollection/DropdownFilter';

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
};

function ViewCollection({ products, sortingOption }: Props) {
	const router = useRouter();
	const { query } = router;

	const selectedFilter = sortingOption;

	const [header, setHeader] = useState(query.productType);

	useEffect(() => {
		setHeader(query.productType);
	}, [query]);

	return (
		<div className={styles.viewProductContainer}>
			<Head>
				<title>Maison Kobe | Collection</title>
			</Head>
			<div className={styles.headerLayout}>
				<div className={styles.header}>{header}</div>
				<DropdownFilter selectedFilter={selectedFilter} />
			</div>
			<div className={styles.viewProductsLayout}>
				{products.map((product, index) => (
					<div key={index} className={styles.product}>
						<DisplayProducts product={product} />
					</div>
				))}
			</div>
		</div>
	);
}

export default ViewCollection;

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
