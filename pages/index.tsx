import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addProducts, getAllProducts } from '../app/productsSlice';
import NewArrivals from '../components/homePage/NewArrivals';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import homepageImage from '../public/furniture/homepage.png';
import lookbookOne from '../public/furniture/lookBookOne.jpeg';
import lookbookTwo from '../public/furniture/lookBook.jpeg';
import Image from 'next/image';

interface productInformation {
	description?: string;
	price?: number;
	productType?: string;
	productName?: string;
	brand?: string;
	id?: string;
	collection?: string;
}

type Props = {
	products: productInformation[];
};

export default function Home({ products }: Props) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(addProducts(products));
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Shop | Home</title>
				{/* <link rel='icon' type='image/x-icon' href='/static/favicon.ico' /> */}
			</Head>
			<div>
				<h1>The Modern Design</h1>
				<Image
					src={homepageImage}
					alt='home-page image'
					width={1350}
					height={300}
				/>
			</div>
			<div>
				<h1>The Sinclair Collection</h1>
				<div className={styles.lookbookLayout}>
					<div>
						<Image
							src={lookbookOne}
							alt='modern design'
							width={550}
							height={600}
						/>
					</div>
					<div className={styles.rightSide}>
						<p>
							<em>
								Innovative design experiences through the use of color, but also
								characterized by an almost scientific approach to the
								exploration of systems as a basis for the development of chairs,
								lamps, textiles, and celebrated interior “environments.” <br />
								<br /> IDA ENGHOLM and ANDERS MICHELSEN
							</em>
						</p>
						<Image
							src={lookbookOne}
							alt='modern design'
							width={500}
							height={500}
						/>
					</div>
				</div>
			</div>
			<span className={styles.header}>New Arrivals</span>
			<div className={styles.trendingCarousel}>
				<NewArrivals products={products} />
			</div>
		</div>
	);
}

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
