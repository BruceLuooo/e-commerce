import React, { useState } from 'react';
import styles from '../styles/OpenCloseArrow.module.css';
import arrow from '../public/arrow.svg';
import Image from 'next/image';

function OpenCloseArrow() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div
				className={
					open
						? `${styles.arrow} ${styles.open} `
						: `${styles.arrow} ${styles.close} `
				}
				onClick={() => setOpen(!open)}
			>
				<Image
					src={arrow}
					alt='open/close description'
					height={30}
					width={30}
				/>
			</div>
		</div>
	);
}

export default OpenCloseArrow;
