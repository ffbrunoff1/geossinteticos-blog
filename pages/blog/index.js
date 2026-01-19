import BlogList from '../../components/BlogList';
import { getFeaturedPosts } from '../../lib/wordpressService';
import Head from 'next/head';

export default function BlogPage({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Portal da Geotecnia</title>
      </Head>
      <BlogList posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const posts = await getFeaturedPosts(30);
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}