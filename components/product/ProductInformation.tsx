import styles from '../../styles/product/Product.module.css';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useState } from 'react';
import OpenCloseArrow from '../../components/OpenCloseArrow';

interface Product {
	description: string;
	price: number;
	productName: string;
	brand: string;
	productType: string;
	id: string;
	imgUrl: string[];
}

type Props = {
	product: Product;
	setQuantity: Function;
	quantity: number;
	addItemToCheckout: Function;
	buyNow: Function;
};

function ProductInformation({
	product,
	setQuantity,
	quantity,
	addItemToCheckout,
	buyNow,
}: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const [descriptionPopup, setDescriptionPopup] = useState(false);

	const addItem = () => {
		setQuantity(quantity + 1);
	};
	const removeItem = () => {
		if (quantity === 1) {
			return;
		} else {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className={styles.productInformation}>
			<span className={styles.name}>{product.productName}</span>
			<span className={styles.price}>
				{currencyFormatter.format(product.price)}
			</span>
			<span className={styles.brand}>{product.brand}</span>
			<hr className={styles.thinLine} />
			<div className={styles.quantityContainer}>
				<span>Quantity</span>
				<div className={styles.quantityLayout}>
					<button
						className={`${styles.quantity} ${styles.addOrRemove}`}
						onClick={removeItem}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
						</svg>
					</button>
					<span className={`${styles.quantity} ${styles.number}`}>
						{quantity}
					</span>
					<button
						className={`${styles.quantity} ${styles.addOrRemove}`}
						onClick={addItem}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
						</svg>
					</button>
				</div>
			</div>
			<button
				className={`${styles.button} ${styles.addToCart} `}
				onClick={(e: any) => addItemToCheckout(product, e)}
			>
				Add To Cart
			</button>
			<button
				className={`${styles.button} ${styles.buy} `}
				onClick={() => buyNow(product)}
			>
				Buy It Now
			</button>
			<div className={styles.descriptionContainer}>
				<div
					className={styles.descriptionHeader}
					onClick={() => setDescriptionPopup(!descriptionPopup)}
				>
					<span>Description</span>
					<div className={styles.arrowIcon}>
						<OpenCloseArrow popup={descriptionPopup} />
					</div>
				</div>
				<span
					className={`${styles.description} ${
						descriptionPopup && styles.openDescription
					}`}
				>
					{product.description}
				</span>
			</div>
		</div>
	);
}

export default ProductInformation;
