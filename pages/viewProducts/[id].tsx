import { collection, getDocs } from '@firebase/firestore';
import { query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase.config';
import DisplayProducts from '../../components/homePage/DisplayProducts';
import styles from '../../styles/viewProducts/ViewProducts.module.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import arrow from '../../public/arrow.svg';
import { useRouter } from 'next/router';

interface Paths {
	params: {
		id: string;
	};
}

interface Product {
	price: number;
	productName: string;
	brand: string;
	productType: string;
	description: string;
	id: string;
}

type Props = {
	products: Product[];
};

function ViewProducts({ products }: Props) {
	const router = useRouter();

	const filterOptions = [
		'Best Selling',
		'Alphabetically, A-Z',
		'Alphabetically, Z-A',
		'Price, low to high',
		'Price, high to low',
	];
	const [header, setHeader] = useState<string>('');
	const [openFilter, setOpenFilter] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState('Best Selling');
	const [displayProducts, setDisplayProducts] = useState(products);

	const setFilter = (e: any) => {
		e.stopPropagation();
		setOpenFilter(!openFilter);
	};

	useEffect(() => {
		const url = document.URL;
		const urlTag = url.split('/');
		setHeader(urlTag[urlTag.length - 1]);
	});

	useEffect(() => {
		const handler = () => setOpenFilter(false);

		addEventListener('click', handler);
	});

	const reorderProducts = async (filter: string) => {
		setSelectedFilter(filter);
		setOpenFilter(false);

		if (filter === 'Best Selling') {
			return setDisplayProducts(products);
		}

		const getCollection = collection(db, 'products');
		let q;

		if (filter === 'Alphabetically, A-Z') {
			q = query(
				getCollection,
				where('productType', '==', `${header}`),
				orderBy('productName'),
			);
		} else if (filter === 'Alphabetically, Z-A') {
			q = query(
				getCollection,
				where('productType', '==', `${header}`),
				orderBy('productName', 'desc'),
			);
		} else if (filter === 'Price, high to low') {
			q = query(
				getCollection,
				where('productType', '==', `${header}`),
				orderBy('price', 'desc'),
			);
		} else {
			q = query(
				getCollection,
				where('productType', '==', `${header}`),
				orderBy('price'),
			);
		}

		const docSnap = await getDocs(q);

		const allProductsRef: Product[] = [];

		docSnap.forEach((doc: any) => {
			allProductsRef.push(doc.data());
		});

		setDisplayProducts(allProductsRef);
	};

	return (
		<div className={styles.viewProductContainer}>
			<div className={styles.headerLayout}>
				<div className={styles.header}>{header}</div>
				<div className={styles.dropdownContainer}>
					<button
						className={`${styles.filterButton} ${
							openFilter && styles.filterButtonWide
						}`}
						onClick={setFilter}
					>
						<span className={styles.filterSelection}>{selectedFilter}</span>
						<span
							className={`${styles.filterArrow} ${
								openFilter && styles.filterOpen
							}`}
						>
							<Image
								src={arrow}
								alt={'open/close filter'}
								width={25}
								height={25}
							/>
						</span>
					</button>
					<div
						className={`${styles.dropdownMenu} ${openFilter && styles.visible}`}
					>
						{filterOptions.map((filter, index) => (
							<button
								key={index}
								className={`${styles.filterSelection} ${styles.filterOptions}`}
								onClick={() => reorderProducts(filter)}
							>
								{filter}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className={styles.viewProductsLayout}>
				{products.map((product, index) => (
					<div key={index}>
						<DisplayProducts product={product} />
					</div>
				))}
			</div>
		</div>
	);
}

export default ViewProducts;

export async function getStaticPaths() {
	let products: Paths[] = [];

	await getDocs(collection(db, 'productType')).then(querySnapshot => {
		querySnapshot.forEach(doc => {
			products.push({
				params: {
					id: `${doc.data().type}`,
				},
			});
		});
	});

	return { paths: products, fallback: false };
}

export async function getStaticProps({ params }: any) {
	const productData: Product[] = [];
	const q = query(
		collection(db, 'products'),
		where('productType', '==', `${params.id}`),
	);

	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc: any) => {
		productData.push(doc.data());
	});

	return {
		props: {
			products: productData,
		},
	};
}
