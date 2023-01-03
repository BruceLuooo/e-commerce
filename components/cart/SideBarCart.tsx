import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '../../styles/cart/SideBarCart.module.css';
import astro from '../../public/astro.png';
import greenCheck from '../../public/greenCheck.svg';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useSelector } from 'react-redux';
import { getCheckoutItems } from '../../app/checkoutSlice';

type Props = {
	quantity: number;
	totalCost: number;
	product: string;
};

function SideBarCart({ quantity, totalCost, product }: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const checkoutItems = useSelector(getCheckoutItems);

	let totalItemsInCheckoutBag = 0;

	checkoutItems.forEach(item => (totalItemsInCheckoutBag += item.quantity));

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
					<span>{product}</span>
					<span>Quantity: {quantity}</span>
					<span>{currencyFormatter.format(totalCost)}</span>
				</div>
			</div>
			<Link className={styles.button} href={'/cart'}>
				View Bag({totalItemsInCheckoutBag})
			</Link>
			<Link className={styles.button} href={'/buy'}>
				Checkout
			</Link>
		</div>
	);
}

export default SideBarCart;
