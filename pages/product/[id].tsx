import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import Image from 'next/image';
import { db } from '../../firebase.config';
import styles from '../../styles/product/Product.module.css';
import { useEffect, useState } from 'react';
import OpenCloseArrow from '../../components/OpenCloseArrow';
import SuggestedProducts from '../../components/SuggestedProducts';
import SideBarCart from '../../components/cart/SideBarCart';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { useAppDispatch } from '../../app/hooks';
import { addToCheckout } from '../../app/checkoutSlice';
import { useRouter } from 'next/router';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';

interface Information {
	params: {
		id: string;
	};
}

type Props = {
	product: Product;
};

interface Product {
	description: string;
	price: number;
	productName: string;
	brand: string;
	productType: string;
	id: string;
	imgUrl: string;
}

export default function Product({ product }: Props) {
	const { currencyFormatter } = useFormatCurrency();
	const dispatch = useAppDispatch();
	const navigate = useRouter();

	const [quantity, setQuantity] = useState(1);
	const [totalCost, setTotalCost] = useState(product.price);
	const [descriptionPopup, setDescriptionPopup] = useState(false);
	const [sideBarCart, setSideBarCart] = useState(false);

	useEffect(() => {
		const handler = () => setSideBarCart(false);

		'click scroll'.split(' ').forEach(e => addEventListener(e, handler));
	}, []);

	useEffect(() => {
		setTotalCost(product.price * quantity);
	}, [quantity]);

	const openSideBarCart = (e: any) => {
		e.stopPropagation();
		setSideBarCart(true);
	};

	const addItem = () => {
		setQuantity(quantity + 1);
	};
	const removeItem = () => {
		if (quantity === 1) {
			return;
		} else {
			setQuantity(quantity - 1);
		}
	};
	const addItemToCheckout = (quantity: number, product: Product, e: any) => {
		e.stopPropagation();
		const item = {
			price: product.price,
			productName: product.productName,
			brand: product.brand,
			quantity: quantity,
			id: product.id,
			imgUrl: product.imgUrl[0],
		};

		setSideBarCart(true);
		dispatch(addToCheckout(item));
	};
	const goToCheckout = (quantity: number, product: Product) => {
		const item = {
			price: product.price,
			productName: product.productName,
			brand: product.brand,
			quantity: quantity,
			id: product.id,
			imgUrl: product.imgUrl,
		};

		dispatch(addToCheckout(item));
		navigate.push('/buy');
	};

	return (
		<div className={styles.productContainer}>
			<Head>
				<title>{`${product.productName} | Shop`}</title>
			</Head>
			<div className={styles.product}>
				<Swiper
					pagination={{
						type: 'fraction',
					}}
					navigation={true}
					loop={true}
					modules={[Pagination, Navigation]}
					className={styles.swiperContainer}
				>
					<SwiperSlide className={styles.productImage}>
						<Image
							src={product.imgUrl[0]}
							alt='product Image'
							width={550}
							height={650}
						/>
					</SwiperSlide>
					<SwiperSlide className={styles.productImage}>
						<Image
							src={product.imgUrl[1]}
							alt='product Image'
							width={550}
							height={650}
						/>
					</SwiperSlide>
				</Swiper>
				<div className={styles.productInformation}>
					<span className={styles.name}>{product.productName}</span>
					<span className={styles.price}>
						{currencyFormatter.format(product.price)}
					</span>
					<span className={styles.brand}>{product.brand}</span>
					<hr className={styles.thinLine} />
					<div className={styles.quantityContainer}>
						<span>Quantity</span>
						<div className={styles.quantityLayout}>
							<button
								className={`${styles.quantity} ${styles.addOrRemove}`}
								onClick={removeItem}
							>
								-
							</button>
							<span className={`${styles.quantity} ${styles.number}`}>
								{quantity}
							</span>
							<button
								className={`${styles.quantity} ${styles.addOrRemove}`}
								onClick={addItem}
							>
								+
							</button>
						</div>
					</div>
					<button
						className={`${styles.button} ${styles.addToCart} `}
						onClick={(e: any) => addItemToCheckout(quantity, product, e)}
					>
						Add To Cart
					</button>
					<button
						className={`${styles.button} ${styles.buy} `}
						onClick={() => goToCheckout(quantity, product)}
					>
						Buy It Now
					</button>
					<div className={styles.descriptionContainer}>
						<div
							className={styles.descriptionHeader}
							onClick={() => setDescriptionPopup(!descriptionPopup)}
						>
							<span>Description</span>
							<div className={styles.arrowIcon}>
								<OpenCloseArrow popup={descriptionPopup} />
							</div>
						</div>
						<span
							className={`${styles.description} ${
								descriptionPopup && styles.openDescription
							}`}
						>
							{product.description}
						</span>
					</div>
				</div>
			</div>
			<SuggestedProducts />
			<div
				className={`${styles.sideBarCart} ${
					sideBarCart && styles.sideBarCartActive
				}`}
				onClick={openSideBarCart}
			>
				<SideBarCart
					totalCost={totalCost}
					quantity={quantity}
					product={product}
				/>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	let products: Information[] = [];

	await getDocs(collection(db, 'products')).then(querySnapshot => {
		querySnapshot.forEach(doc => {
			products.push({
				params: {
					id: `${doc.id}`,
				},
			});
		});
	});

	return { paths: products, fallback: false };
}

export async function getStaticProps({ params }: any) {
	const docRef = doc(db, 'products', `${params.id}`);
	const docSnap = await getDoc(docRef);
	const product = docSnap.data();

	return {
		props: {
			product,
		},
	};
}
