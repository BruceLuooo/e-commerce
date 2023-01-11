import React, { useEffect, useState } from 'react';
import styles from '../../styles/cart/Cart.module.css';
import { useAppSelector } from '../../app/hooks';
import { getCheckoutItems } from '../../app/checkoutSlice';
import Head from 'next/head';
import Summary from '../../components/cart/Summary';
import ItemsInCart from '../../components/cart/ItemsInCart';

interface productInformation {
	price: number;
	productName: string;
	brand: string;
	id: string;
	quantity: number;
	imgUrl: string;
}

const index = () => {
	const checkoutItems = useAppSelector(getCheckoutItems);

	const [totalCost, setTotalCost] = useState<number>(0);
	const [items, setItems] = useState<productInformation[]>([]);

	useEffect(() => {
		let totalAmount = 0;
		checkoutItems.forEach(item => (totalAmount += item.price! * item.quantity));
		setTotalCost(totalAmount);
		// @ts-ignore
		setItems(checkoutItems);
	}, [checkoutItems]);

	return (
		<div className={styles.cartContainer}>
			<Head>
				<title>Maison Kobe | Cart</title>
			</Head>
			<div className={styles.cartLayout}>
				<div className={styles.items}>
					<span className={styles.header}>Bag</span>
					{items.length === 0 ? (
						<div>Your Bag Is Empty</div>
					) : (
						<ItemsInCart items={items} />
					)}
				</div>
				<Summary items={items} totalCost={totalCost} />
			</div>
		</div>
	);
};

export default index;
