import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Geossintéticos.Blog - Portal da Geotecnia</title>
        <meta name="description" content="Geossintéticos.Blog - Seu portal especializado em geotecnia e geossintéticos. Conteúdo técnico sobre geotêxtil, geomembrana, geogrelha e mais." />
        
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
