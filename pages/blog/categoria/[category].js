import BlogList from '../../../components/BlogList';
import { getPostsByCategory, getCategories } from '../../../lib/wordpressService';
import Head from 'next/head';

export default function BlogCategoryPage({ posts }) {
  const categoryName = posts?.[0]?.category || 'Categoria';
  
  return (
    <>
      <Head>
        <title>{categoryName} - Portal da Geotecnia</title>
      </Head>
      <BlogList posts={posts} />
    </>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories();
  
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { category } = context.params;
  const posts = await getPostsByCategory(category, 30);
  
  return {
    props: {
      posts,
    },
    revalidate: 3600, // Revalida a cada 1 hora
  };
}