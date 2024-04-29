import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/cart/SideBarCart.module.css';
import greenCheck from '../../public/greenCheck.svg';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { getCheckoutItems } from '../../app/checkoutSlice';
import { uuid } from 'uuidv4';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useAppSelector } from '../../app/hooks';

interface productInformation {
	productName: string;
	imgUrl: string[];
}

type Props = {
	quantity: number;
	totalCost: number;
	product: productInformation;
};

function SideBarCart({ quantity, totalCost, product }: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const router = useRouter();
	const checkoutItems = useAppSelector(getCheckoutItems);

	const [itemsInCart, setItemsInCart] = useState<number>(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		let totalItemsInCheckoutBag = 0;
		let totalAmount = 0;
		checkoutItems.forEach(
			item => (
				(totalAmount += item.price! * item.quantity),
				(totalItemsInCheckoutBag += item.quantity)
			),
		);
		setItemsInCart(totalItemsInCheckoutBag);
		setTotal(totalAmount);
	}, [checkoutItems]);

	const goToCheckout = async () => {
		const setId = uuid();
		const data = {
			itemsInCart: checkoutItems,
			total: total,
		};
		await setDoc(doc(db, 'userCheckoutCart', `${setId}`), data);

		router.push(`/checkout/${setId}`);
	};

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
			<button className={styles.checkoutButton} onClick={goToCheckout}>
				Checkout
			</button>
		</div>
	);
}

export default SideBarCart;
