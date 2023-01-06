import React, { useEffect, useState } from 'react';
import styles from '../../styles/homePage/NewArrivals.module.css';
import DisplayProducts from './DisplayProducts';

interface productInformation {
	description?: string;
	price?: number;
	productType?: string;
	productName?: string;
	brand?: string;
	id?: string;
	collection?: string;
}

type props = {
	products: productInformation[];
};

function NewArrivals(products: props) {
	useEffect(() => {
		const newArrivals = products.products.filter(
			product => product.collection === 'newArrival',
		);

		// @ts-ignore
		setItems(newArrivals);
	}, []);

	const [items, setItems] = useState([]);

	return (
		<div className={styles.carousel}>
			{items.map((product, index) => (
				<DisplayProducts key={index} product={product} />
			))}
		</div>
	);
}

export default NewArrivals;
