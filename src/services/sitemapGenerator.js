import axios from 'axios';
import { WORDPRESS_CONFIG } from '../config/wordpress.js';

// Cliente axios para WordPress
const wordpressClient = axios.create({
  baseURL: WORDPRESS_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para buscar todos os posts
async function getAllPosts() {
  try {
    const allPosts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await wordpressClient.get('/posts', {
        params: {
          per_page: 100,
          page: page,
          status: 'publish',
          orderby: 'date',
          order: 'desc'
        }
      });

      if (response.data.length === 0 || response.data.length < 100) {
        hasMore = false;
      }
      
      if (response.data.length > 0) {
        allPosts.push(...response.data);
        page++;
      }
    }

    return allPosts.map(post => ({
      slug: post.slug,
      modified: post.modified,
      date: post.date
    }));
  } catch (error) {
    console.error('Erro ao buscar posts:', error.message);
    return [];
  }
}

// Função para buscar todas as categorias
async function getAllCategories() {
  try {
    const response = await wordpressClient.get('/categories', {
      params: {
        per_page: 100,
        orderby: 'count',
        order: 'desc'
      }
    });

    return response.data.map(category => ({
      slug: category.slug,
      name: category.name,
      count: category.count
    }));
  } catch (error) {
    console.error('Erro ao buscar categorias:', error.message);
    return [];
  }
}

// Função principal para gerar sitemap XML
export async function generateSitemapXML(baseUrl = 'https://geossinteticos.blog') {
  try {
    const [posts, categories] = await Promise.all([
      getAllPosts(),
      getAllCategories()
    ]);

    // URLs estáticas
    const staticUrls = [
      {
        url: baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: `${baseUrl}/blog`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9'
      }
    ];

    // URLs dos posts
    const postUrls = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: new Date(post.modified).toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }));

    // URLs das categorias
    const categoryUrls = categories.map(category => ({
      url: `${baseUrl}/blog/categoria/${category.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.7'
    }));

    // Combinar todas as URLs
    const allUrls = [...staticUrls, ...postUrls, ...categoryUrls];

    // Gerar XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    allUrls.forEach(urlData => {
      xml += '  <url>\n';
      xml += `    <loc>${urlData.url}</loc>\n`;
      xml += `    <lastmod>${urlData.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${urlData.changefreq}</changefreq>\n`;
      xml += `    <priority>${urlData.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    throw error;
  }
}
