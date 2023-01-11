import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Head from 'next/head';
import { db } from '../../firebase.config';
import styles from '../../styles/product/Product.module.css';
import { useEffect, useState } from 'react';
import SuggestedProducts from '../../components/SuggestedProducts';
import SideBarCart from '../../components/cart/SideBarCart';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCheckout, getCheckoutItems } from '../../app/checkoutSlice';
import { useRouter } from 'next/router';
import { uuid } from 'uuidv4';
import ImageCarousel from '../../components/product/ImageCarousel';
import ProductInformation from '../../components/product/ProductInformation';

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
	imgUrl: string[];
}

export default function Product({ product }: Props) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const checkoutItems = useAppSelector(getCheckoutItems);

	const [quantity, setQuantity] = useState(1);
	const [totalCost, setTotalCost] = useState(product.price);
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

	const addItemToCheckout = (product: Product, e: any) => {
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
	const buyNow = async (product: Product) => {
		const item = {
			price: product.price,
			productName: product.productName,
			brand: product.brand,
			quantity: quantity,
			id: product.id,
			imgUrl: product.imgUrl[0],
		};

		dispatch(addToCheckout(item));
		goToCheckout(product);
	};

	const goToCheckout = async (product: Product) => {
		let totalAmount = 0;
		checkoutItems.forEach(item => (totalAmount += item.price! * item.quantity));
		totalAmount += product.price! * quantity;
		const setId = uuid();
		const data = {
			itemsInCart: [
				...checkoutItems,
				{
					price: product.price,
					productName: product.productName,
					brand: product.brand,
					quantity: quantity,
					id: product.id,
					imgUrl: product.imgUrl[0],
				},
			],
			total: totalAmount,
		};
		await setDoc(doc(db, 'userCheckoutCart', `${setId}`), data);

		router.push(`/checkout/${setId}`);
	};

	return (
		<div className={styles.productContainer}>
			<Head>
				<title>{`${product.productName} | Shop`}</title>
			</Head>
			<div className={styles.product}>
				<ImageCarousel image={product.imgUrl} />
				<ProductInformation
					product={product}
					setQuantity={setQuantity}
					quantity={quantity}
					addItemToCheckout={addItemToCheckout}
					buyNow={buyNow}
				/>
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
