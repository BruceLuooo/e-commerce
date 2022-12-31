import React, { useState } from 'react';
import styles from '../../styles/homePage/NewArrivals.module.css';
import DisplayProducts from './DisplayProducts';

interface productInformation {
	description?: string;
	price?: number;
	productType?: string;
	productName?: string;
	brand?: string;
	id?: string;
}

type props = {
	products: productInformation[];
};

function NewArrivals(products: props) {
	return (
		<div className={styles.carousel}>
			{products.products.map((product, index) => (
				<DisplayProducts key={index} product={product} />
			))}
		</div>
	);
}

export default NewArrivals;
