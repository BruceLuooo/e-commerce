import Link from 'next/link';
import React from 'react';
import styles from '../../styles/navbar/NavbarPopup.module.css';

function NavbarPopup() {
	const productType = ['Accessories', 'Cleansers', 'Masks', 'Moisturizer'];
	const skinType = ['Oily', 'Dry', 'Normal', 'Combination'];

	return (
		<div className={styles.popupContainer}>
			<div className={styles.productList}>
				<span>Product Type</span>
				<div>
					{productType.map((product, index) => (
						<div key={index} className={styles.products}>
							<Link href={`/collections/${product}`}>{product}</Link>
						</div>
					))}
				</div>
			</div>
			<div className={styles.productList}>
				<span>Skin Type</span>
				<div>
					{skinType.map((product, index) => (
						<div key={index} className={styles.products}>
							<Link href={`/collections/${product}`}>{product}</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default NavbarPopup;
