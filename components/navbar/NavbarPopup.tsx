import Link from 'next/link';
import React from 'react';
import styles from '../../styles/navbar/NavbarPopup.module.css';

type Props = {
	setPopup: Function;
};

function NavbarPopup({ setPopup }: Props) {
	const productType = ['Accessories', 'Cleanser', 'Mask', 'Moisturizer'];
	const skinType = ['Oily', 'Dry', 'Normal', 'Combination'];

	return (
		<div className={styles.popupContainer}>
			<div className={styles.productList}>
				<span>Product Type</span>
				<div>
					{productType.map((product, index) => (
						<div key={index} className={styles.products}>
							<Link
								href={`/viewProducts/${product}`}
								onClick={() => setPopup(false)}
							>
								{product}
							</Link>
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
