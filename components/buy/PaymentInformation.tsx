import React, { useState } from 'react';
import styles from '../../styles/buy/PaymentInformation.module.css';
import useHandlePaymentInfo from '../../hooks/useHandlePaymentInfo';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../app/hooks';
import { clearState } from '../../app/checkoutSlice';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

type Props = {
	prevPage: Function;
};

function PaymentInformation({ prevPage }: Props) {
	const {
		paymentInfo,
		updateCVV,
		updateMonthAndYear,
		updateCardNumber,
		updateNameAndPromo,
		isFormCompletetd,
	} = useHandlePaymentInfo();

	const dispatch = useAppDispatch();
	const router = useRouter();
	const { id } = router.query;

	const [error, setError] = useState({ active: false, msg: '' });

	const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormCompletetd(paymentInfo)) {
			return setError({ active: true, msg: 'Please Check Information' });
		} else {
			dispatch(clearState());
			await deleteDoc(doc(db, 'userCheckoutCart', `${id}`));
			router.push('/checkout/completed');
		}
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
					value={paymentInfo.promoCode}
					onChange={updateNameAndPromo}
				/>
				{paymentInfo.promoCode !== '' && (
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
					value={paymentInfo.nameOnCard}
					onChange={updateNameAndPromo}
				/>
				{paymentInfo.nameOnCard !== '' && (
					<div className={styles.inputLabel}>Name on card</div>
				)}
			</div>
			<div className={styles.inputContainer}>
				<input
					className={styles.textInput}
					id='cardNumber'
					type='text'
					placeholder='Card number'
					value={paymentInfo.cardNumber}
					onChange={updateCardNumber}
				/>
				{paymentInfo.cardNumber !== '' && (
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
						value={paymentInfo.monthAndYear}
						onChange={updateMonthAndYear}
					/>
					{paymentInfo.monthAndYear !== '' && (
						<div className={styles.inputLabel}>MM/YY</div>
					)}
				</div>
				<div className={styles.inputContainer}>
					<input
						className={`${styles.textInput} `}
						id='cvv'
						type='text'
						placeholder='CVV'
						value={paymentInfo.cvv}
						onChange={updateCVV}
					/>
					{paymentInfo.cvv !== '' && (
						<div className={styles.inputLabel}>CVV</div>
					)}
				</div>
			</div>
			{error && <div className={styles.error}>{error.msg}</div>}
			<button type='submit' className={styles.button}>
				Place Order
			</button>
		</form>
	);
}

export default PaymentInformation;
