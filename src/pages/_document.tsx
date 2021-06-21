import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

// Generate favicons here https://realfavicongenerator.net/
// Great variable fonts database https://fonts.google.com/?vfonly=true
export const siteName = 'ReactJS Template';

class MyDocument extends Document {
 static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
   ctx.renderPage = () =>
    originalRenderPage({
     enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
    });

   const initialProps = await Document.getInitialProps(ctx);
   return {
    ...initialProps,
    styles: (
     <>
      {initialProps.styles}
      {sheet.getStyleElement()}
     </>
    ),
   };
  } finally {
   sheet.seal();
  }
 }

 render(): ReactElement {
  return (
   <Html>
    <Head>
     <link rel="apple-touch-icon" sizes="60x60" href="apple-touch-icon-60x60.png" />
     <link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png" />
     <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png" />
     <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png" />
     <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png" />
     <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
     <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
     <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png" />
     <link rel="mask-icon" href="safari-pinned-tab.svg" color="#fff" />
     <link rel="manifest" href="site.webmanifest" />
     <meta name="application-name" content={siteName} />
     <meta name="apple-mobile-web-app-title" content={siteName} />
     <meta name="msapplication-TileColor" content="#fff" />
     <meta name="theme-color" content="#fff" />
    </Head>
    <body>
     <Main />
     <NextScript />
    </body>
   </Html>
  );
 }
}

export default MyDocument;