import React, { useState } from 'react';
import styles from '../../styles/buy/PaymentInformation.module.css';

type Props = {
	nextPage: Function;
};

function ShippingInformation({ nextPage }: Props) {
	const [userInfo, setUserInfo] = useState({
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

	const goToPayment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		nextPage(true);
	};

	return (
		<form className={styles.userInformation} onSubmit={goToPayment}>
			<div className={styles.userInformation}>
				<span className={styles.header}>Shipping Information</span>
				<div className={styles.inputContainer}>
					<input
						className={styles.textInput}
						id='name'
						type='text'
						placeholder='First Name'
						// value={userInfo.name}
						// onChange={updateUserInfo}
					/>
					{userInfo.name !== '' && (
						<div className={styles.inputLabel}>First Name</div>
					)}
				</div>
				<div className={styles.inputContainer}>
					<input
						className={styles.textInput}
						id='lastName'
						type='text'
						placeholder='Last Name'
						// value={userInfo.lastName}
						// onChange={updateUserInfo}
					/>
					{userInfo.lastName !== '' && (
						<div className={styles.inputLabel}>Last Name</div>
					)}
				</div>
				<div className={styles.inputContainer}>
					<input
						className={styles.textInput}
						id='address'
						type='text'
						placeholder='Address'
						// value={userInfo.address}
						// onChange={updateUserInfo}
					/>
					{userInfo.address !== '' && (
						<div className={styles.inputLabel}>Address</div>
					)}
				</div>

				<div className={styles.smallInputLayout}>
					<div className={styles.inputContainer}>
						<input
							className={`${styles.textInput} `}
							id='city'
							type='text'
							placeholder='City'
							// value={userInfo.city}
							// onChange={updateUserInfo}
						/>
						{userInfo.city !== '' && (
							<div className={styles.inputLabel}>City</div>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={`${styles.textInput} `}
							id='postalCode'
							type='text'
							placeholder='Postal Code'
							// value={userInfo.postalCode}
							// onChange={updateUserInfo}
						/>
						{userInfo.postalCode !== '' && (
							<div className={styles.inputLabel}>Postal Code</div>
						)}
					</div>
				</div>
				<div className={styles.smallInputLayout}>
					<div className={styles.inputContainer}>
						<input
							className={`${styles.textInput} `}
							id='province'
							type='text'
							placeholder='Province'
							// value={userInfo.province}
							// onChange={updateUserInfo}
						/>
						{userInfo.province !== '' && (
							<div className={styles.inputLabel}>Province</div>
						)}
					</div>
					<div className={styles.inputContainer}>
						<input
							className={`${styles.textInput} `}
							type='text'
							value={'Canada'}
							disabled={true}
						/>
						<div className={styles.inputLabel}>Country</div>
					</div>
				</div>
			</div>
			<div className={styles.userInformation}>
				<span className={styles.header}>Contact Information</span>
				<div className={styles.inputContainer}>
					<input
						className={`${styles.textInput} `}
						id='email'
						type='text'
						placeholder='Email'
						// value={userInfo.email}
						// onChange={updateUserInfo}
					/>
					{userInfo.email !== '' && (
						<div className={styles.inputLabel}>Email</div>
					)}
				</div>
				<div className={styles.inputContainer}>
					<input
						className={`${styles.textInput} `}
						id='phone'
						type='text'
						placeholder='Phone Number'
						// value={userInfo.phone}
						// onChange={updateUserInfo}
					/>
					{userInfo.phone !== '' && (
						<div className={styles.inputLabel}>Phone</div>
					)}
				</div>
			</div>
			<button type='submit' className={styles.button}>
				Continue
			</button>
		</form>
	);
}

export default ShippingInformation;
