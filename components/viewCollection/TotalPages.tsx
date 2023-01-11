import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/viewCollection/ViewCollection.module.css';

type Props = {
	pages: number[];
};

function TotalPages({ pages }: Props) {
	const router = useRouter();
	const { query } = router;

	const goToPage = (pageNumber: number) => {
		const number = pageNumber;
		query.page = number.toString();

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};

	return (
		<div className={styles.numberOfPages}>
			{pages.map((pageNumber, index) => (
				<button
					className={`${styles.pageButton} ${
						query.page === pageNumber.toString() && styles.pageSelectedActive
					} `}
					key={index}
					disabled={query.page === pageNumber.toString() ? true : false}
					onClick={() => goToPage(pageNumber)}
				>
					{pageNumber}
				</button>
			))}
		</div>
	);
}

export default TotalPages;
