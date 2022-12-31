import React from 'react';
import styles from '../../styles/cart/Cart.module.css';
import astro from '../../public/astro.png';
import Image from 'next/image';
import Link from 'next/link';

const index = () => {
	return (
		<div className={styles.cartContainer}>
			<div className={styles.cartLayout}>
				<div className={styles.items}>
					<span className={styles.header}>Bag</span>
					{/* This is gonna be a .map */}
					<div className={styles.item}>
						<div className={styles.image}>
							<Image src={astro} alt='product image' width={150} height={200} />
						</div>
						<div className={styles.itemDescriptionLayout}>
							<div className={styles.itemDescription}>
								<span className={styles.itemName}>Facial Cleanser Special</span>
								<span>By: Corsx</span>
								<div className={styles.quantityLayout}>
									<button
										className={`${styles.quantity} ${styles.addOrRemove}`}
									>
										-
									</button>
									<span className={`${styles.quantity} ${styles.number}`}>
										5
									</span>
									<button
										className={`${styles.quantity} ${styles.addOrRemove}`}
									>
										+
									</button>
								</div>
								<button className={styles.removeItem}>Remove Item</button>
							</div>
							<div>$14.00</div>
						</div>
					</div>
				</div>
				<div className={styles.summary}>
					<span className={styles.header}>Summary</span>
					<div className={styles.costLayout}>
						<span>Subtotal</span>
						<span>$15.00</span>
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
						<span>$100.10</span>
					</div>
					<Link href={'/buy'} className={styles.link}>
						Checkout
					</Link>
					<Link href={'/'} className={styles.link}>
						Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	);
};

export default index;
