import React, { useState } from 'react';
import styles from '../../styles/buy/PaymentInformation.module.css';

type Props = {
	prevPage: Function;
};

function PaymentInformation({ prevPage }: Props) {
	const [userInfo, setUserInfo] = useState({
		promoCode: '',
		nameOnCard: '',
		cardNumber: '',
		monthAndYear: '',
		cvv: '',
	});

	const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className={styles.userInformation} onSubmit={placeOrder}>
			<button
				onClick={() => prevPage(false)}
				type='button'
				className={styles.goBack}
			>
				Back
			</button>
			<span className={styles.header}>Have a promo code?</span>
			<div className={styles.inputContainer}>
				<input
					className={styles.textInput}
					id='promoCode'
					type='text'
					placeholder='Promo'
					// value={userInfo.promoCode}
					// onChange={updateUserInfo}
				/>
				{userInfo.promoCode !== '' && (
					<div className={styles.inputLabel}>Promo</div>
				)}
			</div>
			<span className={styles.header}>Enter your payment details</span>
			<div className={styles.inputContainer}>
				<input
					className={styles.textInput}
					id='nameOnCard'
					type='text'
					placeholder='Name on card'
					// value={userInfo.nameOnCard}
					// onChange={updateUserInfo}
				/>
				{userInfo.nameOnCard !== '' && (
					<div className={styles.inputLabel}>Name on card</div>
				)}
			</div>
			<div className={styles.inputContainer}>
				<input
					className={styles.textInput}
					id='cardNumber'
					type='text'
					placeholder='Card number'
					// value={userInfo.cardNumber}
					// onChange={updateUserInfo}
				/>
				{userInfo.cardNumber !== '' && (
					<div className={styles.inputLabel}>Card number</div>
				)}
			</div>

			<div className={styles.smallInputLayout}>
				<div className={styles.inputContainer}>
					<input
						className={`${styles.textInput} `}
						id='monthAndYear'
						type='text'
						placeholder='MM/YY'
						// value={userInfo.monthAndYear}
						// onChange={updateUserInfo}
					/>
					{userInfo.monthAndYear !== '' && (
						<div className={styles.inputLabel}>MM/YY</div>
					)}
				</div>
				<div className={styles.inputContainer}>
					<input
						className={`${styles.textInput} `}
						id='cvv'
						type='text'
						placeholder='Postal Code'
						// value={userInfo.cvv}
						// onChange={updateUserInfo}
					/>
					{userInfo.cvv !== '' && <div className={styles.inputLabel}>CVV</div>}
				</div>
			</div>
			<button type='submit' className={styles.button}>
				Place Order
			</button>
		</form>
	);
}

export default PaymentInformation;
