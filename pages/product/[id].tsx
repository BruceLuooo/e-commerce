import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import { productInformation } from '../../app/productsSlice';
import { db } from '../../firebase.config';

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
}

export default function Product({ product }: Props) {
	return (
		<div>
			<Head>
				<title>{product.productName} | Shop</title>
			</Head>
			<div>{product.productName}</div>
			<div>{product.price}</div>
			<div>{product.brand}</div>
			<div>{product.description}</div>
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
