import React, { useState } from 'react';
import styles from '../../styles/navbar/Navbar.module.css';
import NavbarPopup from './NavbarPopup';
import cart from '../../public/shoppingCart.svg';
import search from '../../public/search.svg';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
	const [popup, setPopup] = useState(false);
	const [searchBar, setSearchBar] = useState(false);

	return (
		<nav className={styles.navbarContainer}>
			<div className={styles.navbar}>
				<Link href={'/'} className={`${styles.format} ${styles.left}`}>
					<div>Logo</div>
				</Link>
				<div
					className={`${styles.underLineAnimation} ${styles.format} ${styles.center}`}
					onMouseOver={() => setPopup(true)}
					onMouseLeave={() => setPopup(false)}
				>
					Shop
				</div>
				<div className={`${styles.format} ${styles.right}  `}>
					<div className={`${styles.searchBar}`}>
						<input
							type='text'
							className={styles.searchBarInput}
							placeholder='search'
						/>
						<div className={styles.searchIcon}>
							<Image src={search} alt='search Icon' height={20} width={20} />
						</div>
					</div>
					<Link href={'/cart'} className={styles.shoppingCartIcon}>
						<Image src={cart} alt='cart Icon' height={32} width={32} />
						<span>2</span>
					</Link>
				</div>
			</div>

			<div
				onMouseOver={() => setPopup(true)}
				onMouseLeave={() => setPopup(false)}
				className={popup ? styles.popupOpen : styles.popupClosed}
			>
				<NavbarPopup />
			</div>
		</nav>
	);
}

export default Navbar;
