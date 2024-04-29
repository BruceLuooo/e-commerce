export default function useFormatCurrency() {
	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
	});

	return { currencyFormatter };
}
