import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/compactNavbar/CompactNavbar.module.css';
import DropdownMenu from './DropdownMenu';

function CompactNavbar() {
	const [menu, setMenu] = useState(false);

	useEffect(() => {
		const handler = () => {
			setMenu(false);
		};

		window.addEventListener('click', handler);
	}, []);

	const toggleMenu = (e: React.MouseEvent<SVGSVGElement>) => {
		e.stopPropagation();
		setMenu(!menu);
	};

	return (
		<nav className={styles.navbarContainer}>
			<Link href={'/'} className={`${styles.logo} `}>
				MAISON KOBI
			</Link>
			<div className={styles.menuContainer}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='32'
					fill='currentColor'
					viewBox='0 0 16 16'
					onClick={toggleMenu}
					className={styles.hamburger}
				>
					<path
						fill-rule='evenodd'
						d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
					/>
				</svg>
				{menu && (
					<div
						className={styles.menu}
						onClick={(e: React.MouseEvent<HTMLDivElement>) =>
							e.stopPropagation()
						}
					>
						<DropdownMenu setMenu={setMenu} />
					</div>
				)}
			</div>
		</nav>
	);
}

export default CompactNavbar;
