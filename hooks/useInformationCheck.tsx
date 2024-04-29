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

export default function useInformationCheck() {
	const informationCheck = (userInfo: userInfo) => {
		let userInfoValues = Object.values(userInfo);
		const findEmptyValue = userInfoValues.includes('');

		if (findEmptyValue) {
			return false;
		} else {
			return true;
		}
	};

	return { informationCheck };
}
