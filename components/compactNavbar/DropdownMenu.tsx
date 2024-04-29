import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/compactNavbar/CompactNavbar.module.css';
import { getCheckoutItems } from '../../app/checkoutSlice';
import { useAppSelector } from '../../app/hooks';

type Props = {
	setMenu: Function;
};

function DropdownMenu({ setMenu }: Props) {
	const checkoutItems = useAppSelector(getCheckoutItems);

	const [itemsInCart, setItemsInCart] = useState<number>(0);
	const [viewCollection, setViewCollection] = useState(false);

	useEffect(() => {
		let totalItems = 0;
		checkoutItems.forEach(item => (totalItems += item.quantity));
		setItemsInCart(totalItems);
	}, [checkoutItems]);

	return (
		<div className={styles.dropdownMenuContainer}>
			{viewCollection ? (
				<div className={styles.menuSelection}>
					<Link
						className={styles.link}
						href={'/viewCollection?productType=Coffee+Table'}
						onClick={() => setMenu(false)}
					>
						Coffee Tables
					</Link>
					<Link
						className={styles.link}
						href={'/viewCollection?productType=Lamp'}
						onClick={() => setMenu(false)}
					>
						Lamps
					</Link>
					<Link
						className={styles.link}
						href={'/viewCollection?productType=Sofa'}
						onClick={() => setMenu(false)}
					>
						Sofas
					</Link>
					<Link
						className={styles.link}
						href={'/viewCollection?productType=Wall+Deco'}
						onClick={() => setMenu(false)}
					>
						Wall Deco
					</Link>

					<Link
						className={styles.link}
						href={'/viewCollection/all?page=1'}
						onClick={() => setMenu(false)}
					>
						View All
					</Link>
					<button onClick={() => setViewCollection(false)}>Back</button>
				</div>
			) : (
				<div className={styles.menuSelection}>
					<button onClick={() => setViewCollection(true)}>
						Shop Collection
					</button>
					<Link
						onClick={() => setMenu(false)}
						className={styles.link}
						href={'/cart'}
					>
						View Cart ({itemsInCart})
					</Link>
				</div>
			)}
		</div>
	);
}

export default DropdownMenu;
