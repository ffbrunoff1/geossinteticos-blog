import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import { getFeaturedPosts } from '../lib/wordpressService';
import Head from 'next/head';

export default function HomePage({ posts }) {
  return (
    <>
      <Head>
        <title>Geossintéticos.Blog - Portal da Geotecnia</title>
      </Head>
      <Hero posts={posts} />
      <About />
      <Services />
      <Contact />
    </>
  );
}

export async function getStaticProps() {
  const posts = await getFeaturedPosts(4);
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}