import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="App">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
