import React, { useEffect, useState } from 'react';
import styles from '../../styles/viewCollection/ViewCollection.module.css';
import arrow from '../../public/arrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
	selectedFilter: string;
};

function DropdownFilter({ selectedFilter }: Props) {
	const router = useRouter();
	const { query } = router;
	const filterOptions = [
		'Alphabetically, A-Z',
		'Alphabetically, Z-A',
		'Price, low to high',
		'Price, high to low',
	];

	const [openFilter, setOpenFilter] = useState<boolean>(false);

	useEffect(() => {
		const handler = () => setOpenFilter(false);

		addEventListener('click', handler);
	});

	const selectSortOption = (product: string) => {
		filterSearch(product);
	};

	const filterSearch = (sort: string) => {
		query.sort = sort;

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};

	const openAndCloseSortingOptions = (e: any) => {
		e.stopPropagation();
		setOpenFilter(!openFilter);
	};

	return (
		<div className={styles.dropdownContainer}>
			<button
				className={`${styles.filterButton} ${
					openFilter && styles.filterButtonWide
				}`}
				onClick={openAndCloseSortingOptions}
			>
				<span className={styles.filterSelection}>{selectedFilter}</span>
				<span
					className={`${styles.filterArrow} ${openFilter && styles.filterOpen}`}
				>
					<Image src={arrow} alt={'open/close filter'} width={25} height={25} />
				</span>
			</button>
			<div className={`${styles.dropdownMenu} ${openFilter && styles.visible}`}>
				{filterOptions.map((filter, index) => (
					<button
						key={index}
						className={`${styles.filterSelection} ${styles.filterOptions}`}
						onClick={() => selectSortOption(filter)}
					>
						{filter}
					</button>
				))}
			</div>
		</div>
	);
}

export default DropdownFilter;
