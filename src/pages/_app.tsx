import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';

import GlobalStyle from '@styles/global';

import { siteName } from './_document';
import '@public/fonts.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
 return (
  <>
   <Head>
    <title>{siteName}</title>
   </Head>
   <GlobalStyle />
   <Component {...pageProps} />
  </>
 );
};

export default MyApp;
