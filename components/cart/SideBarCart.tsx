import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '../../styles/cart/SideBarCart.module.css';
import astro from '../../public/astro.png';
import greenCheck from '../../public/greenCheck.svg';
import Link from 'next/link';

function SideBarCart() {
	return (
		<div className={styles.sidebarContainer}>
			<div className={styles.header}>
				<span>
					<Image src={greenCheck} alt='check' width={15} height={15} />
				</span>
				<span>Added To Bag</span>
			</div>
			<div className={styles.item}>
				<div>
					<Image src={astro} alt='product image' width={150} height={200} />
				</div>
				<div className={styles.itemDescription}>
					<span>Low pH Good Morning Gel Cleanser </span>
					<span>Quantity: 2</span>
					<span>CA$28.00</span>
				</div>
			</div>
			<Link className={styles.button} href={'/cart'}>
				View Bag(2)
			</Link>
			<Link className={styles.button} href={'/buy'}>
				Checkout
			</Link>
		</div>
	);
}

export default SideBarCart;
