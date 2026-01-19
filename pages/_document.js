import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Geossintéticos.Blog - Seu portal especializado em geotecnia e geossintéticos. Conteúdo técnico sobre geotêxtil, geomembrana, geogrelha e mais." />
        <meta name="keywords" content="geossintéticos, geotecnia, geotêxtil, geomembrana, geogrelha, geocélulas, blog técnico" />
        <meta name="author" content="Geossintéticos.Blog" />
        <meta property="og:title" content="Geossintéticos.Blog - Portal de Geotecnia" />
        <meta property="og:description" content="Conteúdo especializado em geossintéticos e geotecnia" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
