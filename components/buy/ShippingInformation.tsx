import React, { useState } from 'react';
import useInformationCheck from '../../hooks/useInformationCheck';
import styles from '../../styles/buy/PaymentInformation.module.css';

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

type Props = {
	nextPage: Function;
	setUserInfo: Function;
	userInfo: userInfo;
};

function ShippingInformation({ nextPage, setUserInfo, userInfo }: Props) {
	const { informationCheck } = useInformationCheck();

	const [error, setError] = useState({ active: false, msg: '' });

	const goToPayment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userInformationCompleted = informationCheck(userInfo);

		if (userInformationCompleted === false) {
			return setError({ active: true, msg: 'Please Fill In All Fields' });
		} else {
			nextPage(true);
		}
	};

	const updateUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInfo((prev: userInfo) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
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
						value={userInfo.name}
						onChange={updateUserInfo}
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
						value={userInfo.lastName}
						onChange={updateUserInfo}
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
						value={userInfo.address}
						onChange={updateUserInfo}
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
							value={userInfo.city}
							onChange={updateUserInfo}
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
							value={userInfo.postalCode}
							onChange={updateUserInfo}
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
							value={userInfo.province}
							onChange={updateUserInfo}
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
						value={userInfo.email}
						onChange={updateUserInfo}
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
						value={userInfo.phone}
						onChange={updateUserInfo}
					/>
					{userInfo.phone !== '' && (
						<div className={styles.inputLabel}>Phone</div>
					)}
				</div>
			</div>
			{error && <div className={styles.error}>{error.msg}</div>}
			<button type='submit' className={styles.button}>
				Continue
			</button>
		</form>
	);
}

export default ShippingInformation;
