import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<Provider store={store}>
			<Navbar />
			<Component {...pageProps} key={router.asPath} />
		</Provider>
	);
}
