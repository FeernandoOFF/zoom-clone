import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { ReactChild } from 'react';

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: ReactChild) => page);

  return getLayout(
    <div id="App">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
