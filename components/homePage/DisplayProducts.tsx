import Image from 'next/image';
import React from 'react';
import styles from '../../styles/homePage/DisplayProducts.module.css';
import cart from '../../public/shoppingCart.svg';
import Link from 'next/link';
import useFormatCurrency from '../../hooks/useFormatCurrency';

interface productInformation {
	description?: string;
	price?: number;
	productType?: string;
	productName?: string;
	brand?: string;
	id?: string;
}

type props = {
	product: productInformation;
};

function DisplayProducts(product: props) {
	const { currencyFormatter } = useFormatCurrency();

	return (
		<Link
			className={styles.displayContainer}
			href={`/product/${product.product.id}`}
		>
			<div className={styles.image}>
				<Image src={cart} alt='shoppingcart' width={100} height={100} />
			</div>
			<div className={styles.information}>
				<span className={styles.smallFont}>{product.product.brand}</span>
				<span>{product.product.productName}</span>
				<span>{currencyFormatter.format(product.product.price!)}</span>
			</div>
		</Link>
	);
}

export default DisplayProducts;
