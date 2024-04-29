import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import NewArrivals from '../components/homePage/NewArrivals';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import homepageImage from '../public/furniture/homepage.png';
import lookbookOne from '../public/furniture/lookBookOne.jpeg';
import lookbookTwo from '../public/furniture/lookBookTwo.jpeg';
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
	return (
		<div className={styles.container}>
			<Head>
				<title>Maison Kobe | Home</title>
			</Head>
			<div>
				<Image
					src={homepageImage}
					alt='home-page image'
					className={styles.topImage}
				/>
			</div>
			<div className={styles.middleSection}>
				<h1>&#8709; The Sinclair Collection</h1>
				<div className={styles.lookbookLayout}>
					<Image
						src={lookbookOne}
						alt='modern design'
						className={styles.lookBookOne}
					/>
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
							src={lookbookTwo}
							alt='modern design'
							className={styles.lookBookTwo}
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
