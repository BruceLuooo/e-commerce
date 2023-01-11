import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { uuid } from 'uuidv4';
import { db } from '../../firebase.config';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import styles from '../../styles/cart/Cart.module.css';

interface productInformation {
	price: number;
	productName: string;
	brand: string;
	id: string;
	quantity: number;
	imgUrl: string;
}

type Props = {
	items: productInformation[];
	totalCost: number;
};

function Summary({ items, totalCost }: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const router = useRouter();

	const goToCheckout = async () => {
		const setId = uuid();
		const data = {
			itemsInCart: items,
			total: totalCost,
		};
		await setDoc(doc(db, 'userCheckoutCart', `${setId}`), data);

		router.push(`/checkout/${setId}`);
	};

	return (
		<div className={styles.summary}>
			<span className={styles.header}>Summary</span>
			<div className={styles.costLayout}>
				<span>Subtotal</span>
				<span>{currencyFormatter.format(totalCost)}</span>
			</div>
			<div className={styles.costLayout}>
				<span>Estimated Delivery & Handling</span>
				<span>Free</span>
			</div>
			<div className={styles.costLayout}>
				<span>Taxes</span>
				<span>-</span>
			</div>
			<div className={`${styles.costLayout} ${styles.totalCost}`}>
				<span>Total</span>
				<span>{currencyFormatter.format(totalCost)}</span>
			</div>
			<button
				onClick={goToCheckout}
				className={`${styles.link} ${styles.checkout} ${
					items.length === 0 && styles.disabled
				}`}
			>
				Checkout
			</button>
			<Link href={'/viewCollection/all?page=1'} className={styles.link}>
				Continue Shopping
			</Link>
		</div>
	);
}

export default Summary;
