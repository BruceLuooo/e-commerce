import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import Image from 'next/image';
import { db } from '../../firebase.config';
import styles from '../../styles/product/Product.module.css';
import astro from '../../public/astro.png';
import { useEffect, useState } from 'react';
import OpenCloseArrow from '../../components/OpenCloseArrow';
import SuggestedProducts from '../../components/SuggestedProducts';

interface Information {
	params: {
		id: string;
	};
}

type Props = {
	product: Product;
};

interface Product {
	description: string;
	price: number;
	productName: string;
	brand: string;
	productType: string;
}

export default function Product({ product }: Props) {
	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
	});

	const [quantity, setQuantity] = useState(1);
	const [popup, setPopUp] = useState(false);

	const addItem = () => {
		setQuantity(quantity + 1);
	};
	const removeItem = () => {
		if (quantity === 0) {
			return;
		} else {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className={styles.productContainer}>
			<Head>
				<title>{`${product.productName} | Shop`}</title>
			</Head>
			<div className={styles.product}>
				<div className={styles.productImage}>
					<Image src={astro} alt='product Image' width={500} height={600} />
				</div>
				<div className={styles.productInformation}>
					<span className={styles.name}>{product.productName}</span>
					<span className={styles.price}>
						{currencyFormatter.format(product.price)}
					</span>
					<button className={styles.brand}>{product.brand}</button>
					<hr className={styles.thinLine} />
					<div className={styles.quantityContainer}>
						<span>Quantity</span>
						<div className={styles.quantityLayout}>
							<button
								className={`${styles.quantity} ${styles.addOrRemove}`}
								onClick={removeItem}
							>
								-
							</button>
							<span className={`${styles.quantity} ${styles.number}`}>
								{quantity}
							</span>
							<button
								className={`${styles.quantity} ${styles.addOrRemove}`}
								onClick={addItem}
							>
								+
							</button>
						</div>
					</div>
					<button className={`${styles.button} ${styles.addToCart} `}>
						Add To Cart
					</button>
					<button className={`${styles.button} ${styles.buy} `}>
						Buy It Now
					</button>
					<div className={styles.descriptionContainer}>
						<div
							className={styles.descriptionHeader}
							onClick={() => setPopUp(!popup)}
						>
							<span>Description</span>
							<div className={styles.arrowIcon}>
								<OpenCloseArrow popup={popup} />
							</div>
						</div>
						<span
							className={`${styles.description} ${
								popup && styles.openDescription
							}`}
						>
							{product.description}
						</span>
					</div>
				</div>
			</div>
			<SuggestedProducts />
		</div>
	);
}

export async function getStaticPaths() {
	let products: Information[] = [];

	await getDocs(collection(db, 'products')).then(querySnapshot => {
		querySnapshot.forEach(doc => {
			products.push({
				params: {
					id: `${doc.id}`,
				},
			});
		});
	});

	return { paths: products, fallback: false };
}

export async function getStaticProps({ params }: any) {
	const docRef = doc(db, 'products', `${params.id}`);
	const docSnap = await getDoc(docRef);
	const product = docSnap.data();

	return {
		props: {
			product,
		},
	};
}
