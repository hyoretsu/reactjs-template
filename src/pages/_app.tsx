import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement } from 'react';

import { siteName } from './_document';
import '@public/fonts.css';
import '@public/global.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
 return (
  <>
   <Head>
    <title>{siteName}</title>
   </Head>
   <Component {...pageProps} />
  </>
 );
};

export default MyApp;
