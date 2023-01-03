import React, { useState } from 'react';
import styles from '../../styles/buy/Buy.module.css';
import astro from '../../public/astro.png';
import Image from 'next/image';
import PaymentInformation from '../../components/buy/PaymentInformation';
import ShippingInformation from '../../components/buy/ShippingInformation';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useAppSelector } from '../../app/hooks';
import { getCheckoutItems } from '../../app/checkoutSlice';

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

function index() {
	const checkoutItems = useAppSelector(getCheckoutItems);
	const { currencyFormatter } = useFormatCurrency();
	let subtotal = 0;

	checkoutItems.forEach(item => (subtotal += item.price! * item.quantity));

	let tax = subtotal * 0.13;

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

	return (
		<div className={styles.buyContainer}>
			<div className={styles.buyLayout}>
				<div className={styles.orderSummary}>
					<span className={styles.header}>Order Summary</span>
					<div className={styles.costSummary}>
						<span>Subtotal</span>
						<span>{currencyFormatter.format(subtotal)}</span>
					</div>
					<div className={styles.costSummary}>
						<span>Tax</span>
						<span>{currencyFormatter.format(tax)}</span>
					</div>
					<div className={styles.costSummary}>
						<span>Delivery/Shipping</span>
						<span>Free</span>
					</div>
					<div className={`${styles.costSummary} ${styles.totalCost}`}>
						<span>Total</span>
						<span>{currencyFormatter.format(subtotal + tax)}</span>
					</div>
					<div className={styles.orderedItems}>
						<span className={styles.arrivalDate}>
							Arrives Tue, Jan 3 - Fri, Jan 20
						</span>
						{checkoutItems.map((item, index) => (
							<div key={index} className={styles.item}>
								<div className={styles.image}>
									<Image
										src={astro}
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
