import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../../styles/homePage/DisplayProducts.module.css';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCheckout, getCheckoutItems } from '../../app/checkoutSlice';
import { useRouter } from 'next/router';
import { uuid } from 'uuidv4';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';

interface productInformation {
	price?: number;
	productName?: string;
	brand?: string;
	id?: string;
	imgUrl: string;
	collection?: string;
}

type props = {
	product: productInformation;
};

function DisplayProducts(product: props) {
	const { currencyFormatter } = useFormatCurrency();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const checkoutItems = useAppSelector(getCheckoutItems);

	const [displayPopup, setDisplayPopup] = useState(false);
	const buyNow = async (product: productInformation) => {
		const item = {
			price: product.price,
			productName: product.productName,
			brand: product.brand,
			quantity: 1,
			id: product.id,
			imgUrl: product.imgUrl[0],
		};
		dispatch(addToCheckout(item));

		let totalAmount = 0;
		checkoutItems.forEach(item => (totalAmount += item.price! * item.quantity));
		totalAmount += product.price!;
		const setId = uuid();
		const data = {
			itemsInCart: [
				...checkoutItems,
				{
					price: product.price,
					productName: product.productName,
					brand: product.brand,
					quantity: 1,
					id: product.id,
					imgUrl: product.imgUrl[0],
				},
			],
			total: totalAmount,
		};
		await setDoc(doc(db, 'userCheckoutCart', `${setId}`), data);

		router.push(`/checkout/${setId}`);
	};

	return (
		<div
			className={`${styles.displayContainer} `}
			onMouseOver={() => setDisplayPopup(true)}
			onMouseOut={() => setDisplayPopup(false)}
		>
			<div className={styles.container}>
				<Link href={`/product/${product.product.id}`}>
					<div className={styles.image}>
						{displayPopup ? (
							<Image
								src={product.product.imgUrl[1]}
								alt='shoppingcart'
								className={styles.productImage}
								width={400}
								height={500}
							/>
						) : (
							<Image
								src={product.product.imgUrl[0]}
								alt='shoppingcart'
								className={styles.productImage}
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
				<button
					className={`${styles.buyNow} ${displayPopup && styles.active}`}
					onClick={() => buyNow(product.product)}
				>
					Buy Now
				</button>
			</div>
		</div>
	);
}

export default DisplayProducts;
