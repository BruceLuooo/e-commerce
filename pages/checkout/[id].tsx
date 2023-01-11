import React, { useEffect, useState } from 'react';
import styles from '../../styles/buy/Buy.module.css';
import Image from 'next/image';
import PaymentInformation from '../../components/buy/PaymentInformation';
import ShippingInformation from '../../components/buy/ShippingInformation';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCheckoutItems } from '../../app/checkoutSlice';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { addCartFromLink, addToCheckout } from '../../app/checkoutSlice';
import { useRouter } from 'next/router';

interface userInfo {
	name: string;
	lastName: string;
	address: string;
	postalCode: string;
	city: string;
	province: string;
	country: string;
	email: string;
	phone: string;
}

interface productInformation {
	price: number;
	productName: string;
	brand: string;
	id: string;
	quantity: number;
	imgUrl: string;
}

interface checkout {
	itemsInCart: productInformation;
	total: number;
}

type Props = {
	checkoutInformation: checkout;
};

function index({ checkoutInformation }: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [total, setTotal] = useState(0);
	const [items, setItems] = useState<productInformation[]>([]);
	const [userInfo, setUserInfo] = useState<userInfo>({
		name: '',
		lastName: '',
		address: '',
		postalCode: '',
		city: '',
		province: '',
		country: 'Canada',
		email: '',
		phone: '',
	});
	const [nextPage, setNextPage] = useState(false);

	useEffect(() => {
		if (checkoutInformation === null) {
			router.push('/');
		} else {
			dispatch(addCartFromLink(checkoutInformation.itemsInCart));
			setTotal(checkoutInformation.total);
			// @ts-ignore
			setItems(checkoutInformation.itemsInCart);
		}
	}, []);

	return (
		<div className={styles.buyContainer}>
			<Head>
				<title>Maison Kobe | Buy</title>
			</Head>
			<div className={styles.buyLayout}>
				<div className={styles.orderSummary}>
					<span className={styles.header}>Order Summary</span>
					<div className={styles.costSummary}>
						<span>Subtotal</span>
						<span>{currencyFormatter.format(total)}</span>
					</div>
					<div className={styles.costSummary}>
						<span>Tax</span>
						<span>{currencyFormatter.format(total * 0.13)}</span>
					</div>
					<div className={styles.costSummary}>
						<span>Delivery/Shipping</span>
						<span>Free</span>
					</div>
					<div className={`${styles.costSummary} ${styles.totalCost}`}>
						<span>Total</span>
						<span>{currencyFormatter.format(total + total * 0.13)}</span>
					</div>
					<div className={styles.orderedItems}>
						<span className={styles.arrivalDate}>
							Arrives Tue, Jan 3 - Fri, Jan 20
						</span>
						<div>
							{items.map((item, index) => (
								<div key={index} className={styles.item}>
									<div className={styles.image}>
										<Image
											src={item.imgUrl}
											alt='product image'
											width={160}
											height={160}
										/>
									</div>
									<div className={styles.productInfo}>
										<span>{item.productName}</span>
										<span>Quantity: {item.quantity}</span>
										<span>
											{currencyFormatter.format(item.price! * item.quantity)}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={styles.userInformation}>
					{nextPage ? (
						<PaymentInformation prevPage={setNextPage} />
					) : (
						<ShippingInformation
							nextPage={setNextPage}
							setUserInfo={setUserInfo}
							userInfo={userInfo}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default index;

export async function getServerSideProps(context: any) {
	const { id } = context.params;
	const docRef = doc(db, 'userCheckoutCart', `${id}`);
	const docSnap = await getDoc(docRef);

	return {
		props: {
			checkoutInformation: docSnap.data() || null,
		},
	};
}
