// EXEMPLO de configuração da WordPress API
// Copie este arquivo para wordpress.js e configure com sua URL

export const WORDPRESS_CONFIG = {
  // ⚠️ IMPORTANTE: Substitua pela URL REAL do seu WordPress
  BASE_URL: 'https://exemplo-wordpress.com/wp-json/wp/v2',
  
  // Endpoints da API (não altere)
  ENDPOINTS: {
    POSTS: '/posts',
    CATEGORIES: '/categories',
    TAGS: '/tags',
    MEDIA: '/media',
    USERS: '/users'
  },
  
  // Parâmetros padrão para posts (pode personalizar)
  DEFAULT_PARAMS: {
    per_page: 10,        // Número de posts por página
    _embed: true,         // Inclui dados de mídia e usuários
    orderby: 'date',      // Ordenar por: date, title, id, etc.
    order: 'desc'         // Ordem: desc (mais recente) ou asc (mais antigo)
  }
};

// Função para construir URLs da API (não altere)
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${WORDPRESS_CONFIG.BASE_URL}${endpoint}`);
  
  Object.entries({ ...WORDPRESS_CONFIG.DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  
  return url.toString();
};

// ========================================
// CONFIGURAÇÕES ADICIONAIS RECOMENDADAS
// ========================================

// Para buscar posts por categoria específica:
export const CATEGORY_CONFIG = {
  // Slug da categoria que deve aparecer em destaque
  FEATURED_CATEGORY: 'destaque',
  
  // Nome amigável da categoria
  FEATURED_CATEGORY_NAME: 'Artigos em Destaque',
  
  // Número de posts da categoria em destaque
  FEATURED_POSTS_LIMIT: 4
};

// Para personalizar a busca de posts em destaque:
export const POSTS_CONFIG = {
  // Buscar posts sticky (fixos) + posts da categoria em destaque
  INCLUDE_STICKY: true,
  
  // Incluir posts da categoria em destaque
  INCLUDE_FEATURED_CATEGORY: true,
  
  // Fallback: se não houver posts em destaque, buscar posts recentes
  FALLBACK_TO_RECENT: true,
  
  // Número máximo de posts a buscar
  MAX_POSTS: 10
};

// Para cache e performance:
export const PERFORMANCE_CONFIG = {
  // Tempo de cache em milissegundos (5 minutos)
  CACHE_DURATION: 5 * 60 * 1000,
  
  // Habilitar cache local
  ENABLE_CACHE: true,
  
  // Timeout da requisição em milissegundos (10 segundos)
  REQUEST_TIMEOUT: 10000
};
