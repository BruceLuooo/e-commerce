import { getDocs, collection } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import astro from '../public/astro.png';
import styles from '../styles/SuggestedProducts.module.css';
import useFormatCurrency from '../hooks/useFormatCurrency';
import Link from 'next/link';

interface productInformation {
	price?: number;
	productName?: string;
	id?: string;
}

function SuggestedProducts() {
	const { currencyFormatter } = useFormatCurrency();
	const [products, setProducts] = useState<productInformation[]>([]);

	useEffect(() => {
		const getProducts = async () => {
			const products: productInformation[] = [];
			const getFourRandomProducts: productInformation[] = [];
			await getDocs(collection(db, 'products')).then(querySnapshot => {
				querySnapshot.forEach(doc => {
					products.push({
						price: doc.data().price,
						productName: doc.data().productName,
						id: doc.id,
					});
				});
			});

			while (getFourRandomProducts.length < 4) {
				const getRandomNumber = Math.floor(Math.random() * products.length);
				const randomProduct = products[getRandomNumber];
				const findDuplicate = getFourRandomProducts.find(product => {
					product.id === randomProduct.id;
				});

				if (!findDuplicate) {
					getFourRandomProducts.push(randomProduct);
				}
			}

			setProducts(getFourRandomProducts);
		};

		getProducts();
	}, []);

	return (
		<div className={styles.SuggestedProductsContainer}>
			<span>You May Also Like</span>
			<div className={styles.productContainer}>
				{products.map((product, index) => (
					<Link
						href={`/product/${product.id}`}
						key={index}
						className={styles.product}
					>
						<div className={styles.image}>
							<Image src={astro} alt='product image' width={350} height={450} />
						</div>
						<div className={styles.productInformation}>
							<span>{product.productName}</span>
							<span>{currencyFormatter.format(product.price!)}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default SuggestedProducts;
