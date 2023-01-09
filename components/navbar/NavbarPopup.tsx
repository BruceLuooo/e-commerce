import Link from 'next/link';
import React from 'react';
import styles from '../../styles/navbar/NavbarPopup.module.css';
import { useRouter } from 'next/router';

type Props = {
	setPopup: Function;
};

function NavbarPopup({ setPopup }: Props) {
	const router = useRouter();
	const productType = ['Sofa', 'Lamp', 'Wall Deco', 'Coffee Table'];

	const paramSearch = (sort: string) => {
		const { query } = router;
		query.productType = sort;

		router.push({
			pathname: `/viewCollection`,
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
				{productType.map((product, index) => (
					<div key={index} className={styles.products}>
						<button onClick={() => onClick(product)}>{product}</button>
					</div>
				))}
				<div className={styles.products}>
					<button onClick={() => router.push('/viewCollection/all?page=1')}>
						View All
					</button>
				</div>
			</div>
		</div>
	);
}

export default NavbarPopup;
