import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addProducts, getAllProducts } from '../app/productsSlice';
import styles from '../styles/Home.module.css';
import NewArrivals from '../components/homePage/NewArrivals';
import Head from 'next/head';

interface productInformation {
	description?: string;
	price?: number;
	productType?: string;
	productName?: string;
	brand?: string;
	id?: string;
}

type Props = {
	products: productInformation[];
};

export async function getStaticProps() {
	let products: productInformation[] = [];

	await getDocs(collection(db, 'products')).then(querySnapshot => {
		querySnapshot.forEach(doc => {
			products.push(doc.data());
		});
	});
	return {
		props: {
			products,
		},
	};
}

export default function Home({ products }: Props) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(addProducts(products));
	}, []);

	const getProducts = useAppSelector(getAllProducts);

	return (
		<div className={styles.container}>
			<Head>
				<title>Shop | Home</title>
				{/* <link rel='icon' type='image/x-icon' href='/static/favicon.ico' /> */}
			</Head>
			<NewArrivals products={getProducts} />
		</div>
	);
}
