import axios from 'axios';
import { buildApiUrl, WORDPRESS_CONFIG } from '../config/wordpress';

// Cliente axios configurado para WordPress
const wordpressClient = axios.create({
  baseURL: WORDPRESS_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para buscar posts em destaque
export const getFeaturedPosts = async (limit = 4) => {
  try {
    // Primeiro, tenta buscar posts sticky (fixos)
    let posts = [];
    
    try {
      const stickyResponse = await wordpressClient.get('/posts', {
        params: {
          per_page: limit,
          _embed: true,
          orderby: 'date',
          order: 'desc',
          sticky: true,
        },
      });
      
      posts = stickyResponse.data.map(post => formatPost(post));
    } catch (stickyError) {
      console.log('Nenhum post sticky encontrado, buscando posts recentes...');
    }

    // Se não há posts sticky suficientes, busca posts recentes
    if (posts.length < limit) {
      const remainingLimit = limit - posts.length;
      
      try {
        const recentResponse = await wordpressClient.get('/posts', {
          params: {
            per_page: remainingLimit,
            _embed: true,
            orderby: 'date',
            order: 'desc',
            // Exclui posts já encontrados
            exclude: posts.map(post => post.id),
          },
        });
        
        const recentPosts = recentResponse.data.map(post => formatPost(post));
        posts = [...posts, ...recentPosts];
      } catch (recentError) {
        console.log('Erro ao buscar posts recentes:', recentError);
      }
    }

    // Se ainda não há posts suficientes, busca posts por categoria específica
    if (posts.length < limit) {
      const remainingLimit = limit - posts.length;
      
      try {
        const categoryResponse = await wordpressClient.get('/posts', {
          params: {
            per_page: remainingLimit,
            _embed: true,
            orderby: 'date',
            order: 'desc',
            // Busca posts da categoria "destaque" ou similar
            categories: 'destaque',
            exclude: posts.map(post => post.id),
          },
        });
        
        const categoryPosts = categoryResponse.data.map(post => formatPost(post));
        posts = [...posts, ...categoryPosts];
      } catch (categoryError) {
        console.log('Erro ao buscar posts por categoria:', categoryError);
      }
    }

    return posts.slice(0, limit);
  } catch (error) {
    console.error('Erro ao buscar posts em destaque:', error);
    return [];
  }
};

// Função para buscar posts por categoria
export const getPostsByCategory = async (categorySlug, limit = 6) => {
  try {
    const response = await wordpressClient.get('/posts', {
      params: {
        per_page: limit,
        _embed: true,
        orderby: 'date',
        order: 'desc',
        categories: categorySlug,
      },
    });

    return response.data.map(post => formatPost(post));
  } catch (error) {
    console.error(`Erro ao buscar posts da categoria ${categorySlug}:`, error);
    return [];
  }
};

// Função para buscar um post específico por ID
export const getPost = async (postId) => {
  try {
    const response = await wordpressClient.get(`/posts/${postId}`, {
      params: {
        _embed: true,
      },
    });

    return formatPost(response.data);
  } catch (error) {
    console.error(`Erro ao buscar post ${postId}:`, error);
    return null;
  }
};

// Função para buscar um post por slug
export const getPostBySlug = async (slug) => {
  try {
    const response = await wordpressClient.get('/posts', {
      params: {
        slug: slug,
        _embed: true,
      },
    });

    if (response.data && response.data.length > 0) {
      return formatPost(response.data[0]);
    }
    
    return null;
  } catch (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    return null;
  }
};

// Função para buscar categorias
export const getCategories = async () => {
  try {
    const response = await wordpressClient.get('/categories', {
      params: {
        per_page: 100,
        orderby: 'count',
        order: 'desc',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

// Função para formatar dados do post
const formatPost = (post) => {
  // Extrai imagem destacada
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                       post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url ||
                       'https://images.unsplash.com/photo-1581092918484-8313d4c6e2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  // Autor fixo para todos os posts
  const author = 'Geossintéticos';

  // Extrai categorias
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0].name : 'Geral';

  // Calcula tempo de leitura (estimativa baseada no conteúdo)
  const wordCount = post.content?.rendered?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readTime = Math.ceil(wordCount / 200); // 200 palavras por minuto

  // Formata data
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return {
    id: post.id,
    title: post.title?.rendered || 'Sem título',
    excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || 'Sem descrição',
    content: post.content?.rendered || '',
    image: featuredImage,
    category: category,
    readTime: `${readTime} min`,
    author: author,
    date: formattedDate,
    slug: post.slug,
    link: post.link,
    featured: post.sticky || false,
    trending: false, // Pode ser implementado com base em views ou outros critérios
    modified: post.modified,
    status: post.status,
  };
};

// Função para buscar posts relacionados
export const getRelatedPosts = async (postId, categoryIds, limit = 3) => {
  try {
    const response = await wordpressClient.get('/posts', {
      params: {
        per_page: limit,
        _embed: true,
        orderby: 'date',
        order: 'desc',
        categories: categoryIds.join(','),
        exclude: [postId],
      },
    });

    return response.data.map(post => formatPost(post));
  } catch (error) {
    console.error('Erro ao buscar posts relacionados:', error);
    return [];
  }
};
