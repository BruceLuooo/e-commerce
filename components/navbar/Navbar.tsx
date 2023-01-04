import React, { useEffect, useState } from 'react';
import styles from '../../styles/navbar/Navbar.module.css';
import NavbarPopup from './NavbarPopup';
import cart from '../../public/shoppingCart.svg';
import search from '../../public/search.svg';
import Image from 'next/image';
import Link from 'next/link';
import astro from '../../public/astro.png';
import { useAppSelector } from '../../app/hooks';
import { getCheckoutItems } from '../../app/checkoutSlice';
import useDebounce from '../../hooks/useDebounce';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

function Navbar() {
	const checkoutItems = useAppSelector(getCheckoutItems);
	let totalItems = 0;

	checkoutItems.forEach(item => (totalItems += item.quantity));

	const [popup, setPopup] = useState(false);
	const [searchBarActive, setSearchBarActive] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const debounce = useDebounce(searchItem, 300);

	useEffect(() => {
		const handler = () => setSearchBarActive(false);
		addEventListener('click', handler);
	}, []);

	useEffect(() => {
		const findSearchedItems = async () => {
			const q = query(
				collection(db, 'products'),
				where('search', 'array-contains-any', [
					'c',
					'cl',
					'clean',
					'a',
					'as',
					'astronomical',
				]),
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {});
		};

		findSearchedItems();
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
						<div>Logo</div>
					</Link>
				</div>
				<div
					className={`${
						popup ? styles.underLineAnimation : styles.underlineNone
					} ${styles.format} ${styles.middle}`}
					onMouseOver={() => setPopup(true)}
					onMouseLeave={() => setPopup(false)}
				>
					Shop
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
						{totalItems > 0 && <span>{totalItems}</span>}
					</Link>
				</div>
			</div>
			<div
				className={`${styles.searchResultsContainer} ${
					searchBarActive && styles.searchResultsVisible
				}`}
			>
				{/* Use Map to map through results */}
				<Link href={'/viewProducts/Cleanser'}>
					<div className={styles.searchResult}>
						<Image src={astro} alt='product picture' width={90} height={100} />
						<div className={styles.productInfo}>
							<div>Low pH Good Morning Gel Cleanser</div>
							<div>Versace Cleanser</div>
							<div>$14.00</div>
						</div>
					</div>
				</Link>
				<Link href={'/viewProducts/Cleanser'}>
					<div className={styles.searchResult}>
						<Image src={astro} alt='product picture' width={90} height={100} />
						<div className={styles.productInfo}>
							<div>Low pH Good Morning Gel Cleanser</div>
							<div>Versace Cleanser</div>
							<div>$14.00</div>
						</div>
					</div>
				</Link>
				<Link href={'/search'} className={styles.button}>
					See All
				</Link>
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
