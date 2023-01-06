import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/cart/SideBarCart.module.css';
import greenCheck from '../../public/greenCheck.svg';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useSelector } from 'react-redux';
import { getCheckoutItems } from '../../app/checkoutSlice';

interface productInformation {
	productName: string;
	imgUrl: string;
}

type Props = {
	quantity: number;
	totalCost: number;
	product: productInformation;
};

function SideBarCart({ quantity, totalCost, product }: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const checkoutItems = useSelector(getCheckoutItems);

	const [itemsInCart, setItemsInCart] = useState<number>(0);

	useEffect(() => {
		let totalItemsInCheckoutBag = 0;
		checkoutItems.forEach(item => (totalItemsInCheckoutBag += item.quantity));
		setItemsInCart(totalItemsInCheckoutBag);
	}, [checkoutItems]);

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
					<Image
						src={product.imgUrl[0]}
						alt='product image'
						width={150}
						height={200}
					/>
				</div>
				<div className={styles.itemDescription}>
					<span>{product.productName}</span>
					<span>Quantity: {quantity}</span>
					<span>{currencyFormatter.format(totalCost)}</span>
				</div>
			</div>
			<Link className={styles.button} href={'/cart'}>
				View Bag({itemsInCart})
			</Link>
			<Link className={styles.button} href={'/buy'}>
				Checkout
			</Link>
		</div>
	);
}

export default SideBarCart;
