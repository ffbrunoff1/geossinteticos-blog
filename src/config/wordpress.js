// Configuração da WordPress API
export const WORDPRESS_CONFIG = {
  // Substitua pela URL do seu WordPress
  BASE_URL: 'https://api.geossinteticos.blog/wp-json/wp/v2',
  
  // Endpoints da API
  ENDPOINTS: {
    POSTS: '/posts',
    CATEGORIES: '/categories',
    TAGS: '/tags',
    MEDIA: '/media',
    USERS: '/users'
  },
  
  // Parâmetros padrão para posts
  DEFAULT_PARAMS: {
    per_page: 10,
    _embed: true, // Inclui dados de mídia e usuários
    orderby: 'date',
    order: 'desc'
  }
};

// Função para construir URLs da API
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${WORDPRESS_CONFIG.BASE_URL}${endpoint}`);
  
  // Adiciona parâmetros padrão
  Object.entries({ ...WORDPRESS_CONFIG.DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};
