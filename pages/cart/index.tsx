import React, { useEffect, useState } from 'react';
import styles from '../../styles/cart/Cart.module.css';
import Image from 'next/image';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	getCheckoutItems,
	addQuantity,
	removeQuantity,
	removeItem,
} from '../../app/checkoutSlice';
import Head from 'next/head';

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
	const dispatch = useAppDispatch();
	const { currencyFormatter } = useFormatCurrency();

	const [totalCost, setTotalCost] = useState<string>(
		currencyFormatter.format(0),
	);
	const [items, setItems] = useState<productInformation[]>([]);

	useEffect(() => {
		let total = 0;
		checkoutItems.forEach(item => (total += item.price! * item.quantity));
		setTotalCost(currencyFormatter.format(total));
		// @ts-ignore
		setItems(checkoutItems);
	}, [checkoutItems]);

	const removeFromCart = (id: string, quantity: number) => {
		if (quantity === 1) {
			return;
		} else {
			dispatch(removeQuantity(id));
		}
	};
	const addToCart = (id: string) => {
		dispatch(addQuantity(id));
	};
	const removeFromCheckout = (id: string) => {
		dispatch(removeItem(id));
	};

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
						<div>
							{items.map((item, index) => (
								<div key={index} className={styles.item}>
									<div className={styles.image}>
										<Image
											src={item.imgUrl}
											alt='product image'
											width={150}
											height={200}
										/>
									</div>
									<div className={styles.itemDescriptionLayout}>
										<div className={styles.itemDescription}>
											<span className={styles.itemName}>
												{item.productName}
											</span>
											<span>By: {item.brand}</span>
											<div className={styles.quantityLayout}>
												<button
													className={`${styles.quantity} ${styles.addOrRemove}`}
													onClick={() => removeFromCart(item.id, item.quantity)}
												>
													-
												</button>
												<span className={`${styles.quantity} ${styles.number}`}>
													{item.quantity}
												</span>
												<button
													className={`${styles.quantity} ${styles.addOrRemove}`}
													onClick={() => addToCart(item.id)}
												>
													+
												</button>
											</div>
											<button
												className={styles.removeItem}
												onClick={() => removeFromCheckout(item.id)}
											>
												Remove Item
											</button>
										</div>
										<div>
											{currencyFormatter.format(item.price! * item.quantity)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div className={styles.summary}>
					<span className={styles.header}>Summary</span>
					<div className={styles.costLayout}>
						<span>Subtotal</span>
						<span>{totalCost}</span>
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
						<span>{totalCost}</span>
					</div>
					<Link
						href={'/buy'}
						className={`${styles.link} ${
							items.length === 0 && styles.disabled
						}`}
					>
						Checkout
					</Link>
					<Link href={'/viewCollection/all?page=1'} className={styles.link}>
						Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	);
};

export default index;
