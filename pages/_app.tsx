import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
import CompactNavbar from '../components/compactNavbar/CompactNavbar';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const [useCompactNavbar, setUseCompactNavbar] = useState(false);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth < 1283) {
				setUseCompactNavbar(true);
			} else {
				setUseCompactNavbar(false);
			}
		}

		if (window.innerWidth < 1283) {
			setUseCompactNavbar(true);
		} else {
			setUseCompactNavbar(false);
		}

		window.addEventListener('resize', handleResize);
	}, []);
	return (
		<Provider store={store}>
			{useCompactNavbar ? <CompactNavbar /> : <Navbar />}
			<Component {...pageProps} key={router.asPath} />
		</Provider>
	);
}
