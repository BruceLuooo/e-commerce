import React, { useState } from 'react';
import styles from '../../styles/buy/Buy.module.css';
import astro from '../../public/astro.png';
import Image from 'next/image';
import PaymentInformation from '../../components/buy/PaymentInformation';
import ShippingInformation from '../../components/buy/ShippingInformation';

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
	const provinces = [
		'Alberta',
		'British Columbia',
		'Manitoba',
		'New Brunswick',
		'Newfoundland and Labrador',
		'Northwest Territories',
		'Nova Scotia',
		'Nunavut',
		'Ontario',
		'Prince Edward Island',
		'Quebec',
		'Saskatchewan',
		'Yukon',
	];

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

	// map through object to see if any userInfo is '' for typecheck when submitting
	// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
	const [nextPage, setNextPage] = useState(false);

	const updateUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInfo(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className={styles.buyContainer}>
			<div className={styles.buyLayout}>
				<div className={styles.orderSummary}>
					<span className={styles.header}>Order Summary</span>
					<div className={styles.costSummary}>
						<span>Subtotal</span>
						<span>$100.32</span>
					</div>
					<div className={styles.costSummary}>
						<span>Tax</span>
						<span>$21.32</span>
					</div>
					<div className={styles.costSummary}>
						<span>Delivery/Shipping</span>
						<span>Free</span>
					</div>
					<div className={`${styles.costSummary} ${styles.totalCost}`}>
						<span>Total</span>
						<span>121.64</span>
					</div>
					<div className={styles.orderedItems}>
						<span className={styles.arrivalDate}>
							Arrives Tue, Jan 3 - Fri, Jan 20
						</span>
						{/* Gonna be using map here */}
						<div className={styles.item}>
							<div className={styles.image}>
								<Image
									src={astro}
									alt='product image'
									width={160}
									height={160}
								/>
							</div>
							<div className={styles.productInfo}>
								<span>Clear water present</span>
								<span>Quantity: 4</span>
								<span>$60</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.userInformation}>
					{nextPage ? (
						<PaymentInformation prevPage={setNextPage} />
					) : (
						<ShippingInformation nextPage={setNextPage} />
					)}
				</div>
			</div>
		</div>
	);
}

export default index;
