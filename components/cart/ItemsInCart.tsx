import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import styles from '../../styles/cart/Cart.module.css';
import {
	addQuantity,
	removeQuantity,
	removeItem,
} from '../../app/checkoutSlice';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import Image from 'next/image';

interface productInformation {
	price: number;
	productName: string;
	brand: string;
	id: string;
	quantity: number;
	imgUrl: string;
}

type Props = {
	items: productInformation[];
};

function ItemsInCart({ items }: Props) {
	const dispatch = useAppDispatch();
	const { currencyFormatter } = useFormatCurrency();

	const removeFromCart = (id: string, quantity: number) => {
		if (quantity === 1) {
			return;
		} else {
			dispatch(removeQuantity(id));
		}
	};

	const addToCart = (id: string) => {
		dispatch(addQuantity(id));
	};

	const removeFromCheckout = (id: string) => {
		dispatch(removeItem(id));
	};

	return (
		<div>
			{items.map((item, index) => (
				<div key={index} className={styles.item}>
					<div className={styles.image}>
						<Image
							src={item.imgUrl}
							alt='product image'
							width={150}
							height={200}
						/>
					</div>
					<div className={styles.itemDescriptionLayout}>
						<div className={styles.itemDescription}>
							<span className={styles.itemName}>{item.productName}</span>
							<span>By: {item.brand}</span>
							<div className={styles.quantityLayout}>
								<button
									className={`${styles.quantity} ${styles.addOrRemove}`}
									onClick={() => removeFromCart(item.id, item.quantity)}
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
									{item.quantity}
								</span>
								<button
									className={`${styles.quantity} ${styles.addOrRemove}`}
									onClick={() => addToCart(item.id)}
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
							<button
								className={styles.removeItem}
								onClick={() => removeFromCheckout(item.id)}
							>
								Remove Item
							</button>
						</div>
						<div>{currencyFormatter.format(item.price! * item.quantity)}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ItemsInCart;
