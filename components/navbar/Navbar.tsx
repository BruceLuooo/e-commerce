import React, { useEffect, useState } from 'react';
import styles from '../../styles/navbar/Navbar.module.css';
import NavbarPopup from './NavbarPopup';
import cart from '../../public/shoppingCart.svg';
import search from '../../public/search.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../app/hooks';
import { getCheckoutItems } from '../../app/checkoutSlice';
import useDebounce from '../../hooks/useDebounce';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

interface searchResults {
	brand: string;
	id: string;
	imgUrl: string;
	productName: string;
}

function Navbar() {
	const checkoutItems = useAppSelector(getCheckoutItems);

	const [itemsInCart, setItemsInCart] = useState<number>(0);
	const [popup, setPopup] = useState(false);
	const [searchBarActive, setSearchBarActive] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [error, setError] = useState({
		active: false,
		msg: ``,
	});
	const [searchResults, setSearchResults] = useState<searchResults[]>([]);
	const debounce = useDebounce(searchItem, 300);

	useEffect(() => {
		const handler = () => setSearchBarActive(false);
		addEventListener('click', handler);
	}, []);

	useEffect(() => {
		let totalItems = 0;
		checkoutItems.forEach(item => (totalItems += item.quantity));
		setItemsInCart(totalItems);
	}, [checkoutItems]);

	useEffect(() => {
		let results: any = [];
		const findSearchedItems = async (searchItem: string) => {
			const lowercase = searchItem.toLowerCase();
			const q = query(
				collection(db, 'products'),
				where('search', 'array-contains-any', [`${lowercase}`]),
			);
			const querySnapshot = await getDocs(q);

			if (querySnapshot.docs.length === 0) {
				setSearchResults([]);
				return setError({
					active: true,
					msg: `Sorry, we couldn't find any results
        `,
				});
			} else {
				querySnapshot.forEach(doc => {
					results.push({
						brand: doc.data().brand,
						id: doc.id,
						imgUrl: doc.data().imgUrl[0],
						productName: doc.data().productName,
					});
				});
				setError({
					active: false,
					msg: ``,
				});
				setSearchResults(results);
			}
		};

		if (searchItem === '') {
			setError({ active: false, msg: '' });
			setSearchResults([]);
		} else {
			findSearchedItems(searchItem);
		}
	}, [debounce]);

	const handleSearchBar = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setSearchBarActive(true);
	};

	return (
		<nav className={styles.navbarContainer}>
			<div className={styles.navbar}>
				<div className={styles.left}>
					<Link href={'/'} className={`${styles.format} `}>
						<div>MAISON KOBI</div>
					</Link>
				</div>
				<div
					className={`${
						popup ? styles.underLineAnimation : styles.underlineNone
					} ${styles.format} ${styles.middle}`}
					onMouseOver={() => setPopup(true)}
					onMouseLeave={() => setPopup(false)}
				>
					Collection
				</div>
				<div className={`${styles.format} ${styles.right}  `}>
					<div className={`${styles.searchBar} `} onClick={handleSearchBar}>
						<input
							type='text'
							className={`${styles.searchBarInput} ${
								searchBarActive && styles.searchBarActive
							}`}
							placeholder='search'
							value={searchItem}
							onChange={e => setSearchItem(e.target.value)}
						/>
						<div className={styles.searchIcon}>
							<Image src={search} alt='search Icon' height={20} width={20} />
						</div>
					</div>
					<Link href={'/cart'} className={styles.shoppingCartIcon}>
						<Image src={cart} alt='cart Icon' height={32} width={32} />
						<span
							className={itemsInCart === 0 ? styles.inactive : styles.active}
						>
							{itemsInCart}
						</span>
					</Link>
				</div>
			</div>
			<div
				className={`${styles.searchResultsContainer} ${
					searchBarActive && styles.searchResultsVisible
				}`}
			>
				{searchResults.map((results, index) => (
					<Link key={index} href={`/product/${results.id}`}>
						<div className={styles.searchResult}>
							<Image
								src={results.imgUrl}
								alt='product picture'
								width={90}
								height={100}
							/>
							<div className={styles.productInfo}>
								<div>{results.productName}</div>
								<div>{results.brand}</div>
							</div>
						</div>
					</Link>
				))}
				{error.active && <div className={styles.button}>{error.msg}</div>}
			</div>
			<div
				onMouseOver={() => setPopup(true)}
				onMouseLeave={() => setPopup(false)}
				className={popup ? styles.popupOpen : styles.popupClosed}
			>
				<NavbarPopup setPopup={setPopup} />
			</div>
		</nav>
	);
}

export default Navbar;
