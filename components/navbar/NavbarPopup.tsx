import Link from 'next/link';
import React from 'react';
import styles from '../../styles/navbar/NavbarPopup.module.css';
import { useRouter } from 'next/router';

type Props = {
	setPopup: Function;
};

function NavbarPopup({ setPopup }: Props) {
	const router = useRouter();
	const productType = ['Accessories', 'Cleanser', 'Mask', 'Moisturizer'];
	const skinType = ['Oily', 'Dry', 'Normal', 'Combination'];

	const paramSearch = (sort: string) => {
		const { query } = router;
		query.productType = sort;

		router.push({
			pathname: `/viewProducts`,
			query: query,
		});
	};

	const onClick = (product: string) => {
		paramSearch(product);
		setPopup(false);
	};

	return (
		<div className={styles.popupContainer}>
			<div className={styles.productList}>
				<span>Product Type</span>
				<div>
					{productType.map((product, index) => (
						<div key={index} className={styles.products}>
							<button onClick={() => onClick(product)}>{product}</button>
						</div>
					))}
				</div>
			</div>
			<div className={styles.productList}>
				<span>Skin Type</span>
				<div>
					{skinType.map((product, index) => (
						<div key={index} className={styles.products}>
							<Link
								href={`/collections/${product}`}
								onClick={() => setPopup(false)}
							>
								{product}
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default NavbarPopup;
