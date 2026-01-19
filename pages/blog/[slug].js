import BlogPost from '../../components/BlogPost';
import { getPostBySlug, getFeaturedPosts } from '../../lib/wordpressService';
import Head from 'next/head';

export default function BlogPostPage({ post }) {
  const pageTitle = post?.title 
    ? `${post.title} - Portal da Geotecnia`
    : 'Post não encontrado - Portal da Geotecnia';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <BlogPost post={post} />
    </>
  );
}

export async function getStaticPaths() {
  // Busca os últimos 50 posts para gerar estaticamente
  const posts = await getFeaturedPosts(50);
  
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // Gera novos posts sob demanda
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const post = await getPostBySlug(slug);
  
  // Se não encontrar o post, retorna notFound
  if (!post) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 3600, // Revalida a cada 1 hora
  };
}