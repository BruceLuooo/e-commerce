import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../../styles/homePage/DisplayProducts.module.css';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useAppDispatch } from '../../app/hooks';
import { addToCheckout } from '../../app/checkoutSlice';
import { useRouter } from 'next/router';

interface productInformation {
	price?: number;
	productName?: string;
	brand?: string;
	id?: string;
	imgUrl: string;
}

type props = {
	product: productInformation;
};

function DisplayProducts(product: props) {
	const { currencyFormatter } = useFormatCurrency();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [displayPopup, setDisplayPopup] = useState(false);
	const buyNow = (product: productInformation) => {
		const item = {
			price: product.price,
			productName: product.productName,
			brand: product.brand,
			quantity: 1,
			id: product.id,
			imgUrl: product.imgUrl[0],
		};
		dispatch(addToCheckout(item));
		router.push('/buy');
	};

	return (
		<div
			className={styles.displayContainer}
			onMouseOver={() => setDisplayPopup(true)}
			onMouseOut={() => setDisplayPopup(false)}
		>
			<Link href={`/product/${product.product.id}`}>
				<div className={styles.image}>
					{displayPopup ? (
						<Image
							src={product.product.imgUrl[1]}
							alt='shoppingcart'
							width={400}
							height={500}
						/>
					) : (
						<Image
							src={product.product.imgUrl[0]}
							alt='shoppingcart'
							width={400}
							height={500}
						/>
					)}
				</div>
				<div className={styles.information}>
					<span className={styles.smallFont}>{product.product.brand}</span>
					<span>{product.product.productName}</span>
					<span>{currencyFormatter.format(product.product.price!)}</span>
				</div>
			</Link>
			<div className={`${styles.buyNow} ${displayPopup && styles.active}`}>
				<button onClick={() => buyNow(product.product)}>Buy Now</button>
			</div>
		</div>
	);
}

export default DisplayProducts;
