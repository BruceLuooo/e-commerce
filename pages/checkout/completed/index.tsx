import Link from 'next/link';
import styles from '../../../styles/buy/Completed.module.css';

function index() {
	return (
		<div className={styles.container}>
			<span className={styles.textLarge}>Order Completed!</span>
			<Link href={'/'} className={styles.textSmall}>
				Back To Home Page
			</Link>
		</div>
	);
}

export default index;
