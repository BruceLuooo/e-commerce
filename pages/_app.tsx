import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Navbar />
			<Component {...pageProps} />
		</Provider>
	);
}
