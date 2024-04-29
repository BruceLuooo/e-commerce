import { useState } from 'react';

interface Details {
	promoCode: string;
	nameOnCard: string;
	cardNumber: string;
	cvv: string;
	monthAndYear: string;
}

export default function useHandlePaymentInfo() {
	const [paymentInfo, setPaymentInfo] = useState({
		promoCode: '',
		nameOnCard: '',
		cardNumber: '',
		monthAndYear: '',
		cvv: '',
	});

	const updateNameAndPromo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentInfo(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const updateCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (paymentInfo.cardNumber.length >= 19) {
			const maxLength = e.target.value.slice(0, 19);
			setPaymentInfo(prev => ({
				...prev,
				cardNumber: maxLength,
			}));
		} else {
			if (
				e.target.value.length === 4 ||
				e.target.value.length === 9 ||
				e.target.value.length === 14
			) {
				e.target.value = e.target.value += ' ';
			}

			setPaymentInfo(prev => ({
				...prev,
				[e.target.id]: e.target.value,
			}));
		}
	};
	const updateMonthAndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (paymentInfo.monthAndYear.length >= 5) {
			const maxLength = e.target.value.slice(0, 5);
			setPaymentInfo(prev => ({
				...prev,
				monthAndYear: maxLength,
			}));
		} else {
			if (e.target.value.length == 2) {
				e.target.value = e.target.value += '/';
			}
			setPaymentInfo(prev => ({
				...prev,
				monthAndYear: e.target.value,
			}));
		}
	};
	const updateCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (paymentInfo.cvv.length >= 3) {
			const maxLength = e.target.value.slice(0, 3);
			setPaymentInfo(prev => ({
				...prev,
				cvv: maxLength,
			}));
		} else {
			setPaymentInfo(prev => ({
				...prev,
				[e.target.id]: e.target.value,
			}));
		}
	};

	const isFormCompletetd = (depositDetails: Details) => {
		return (
			depositDetails.cardNumber.length < 19 ||
			containsAnyLetters(depositDetails.cardNumber) ||
			depositDetails.cvv.length < 3 ||
			depositDetails.monthAndYear.length < 5
		);
	};

	const containsAnyLetters = (detail: string) => {
		return /[a-zA-Z]/.test(detail);
	};

	return {
		paymentInfo,
		updateCVV,
		updateMonthAndYear,
		updateCardNumber,
		updateNameAndPromo,
		containsAnyLetters,
		isFormCompletetd,
	};
}
