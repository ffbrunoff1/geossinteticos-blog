// Configuração de ambiente para WordPress API
// Copie este arquivo para config.js e configure com suas URLs

export const ENV_CONFIG = {
  // URL base da sua WordPress (obrigatório)
  WORDPRESS_API_URL: 'https://seu-wordpress.com/wp-json/wp/v2',
  
  // URL do site WordPress para links (opcional)
  WORDPRESS_SITE_URL: 'https://seu-wordpress.com',
  
  // Configurações adicionais (opcional)
  FEATURED_POSTS_LIMIT: 4,
  ENABLE_CACHE: true,
  CACHE_DURATION: 300000, // 5 minutos em milissegundos
  
  // Configurações de desenvolvimento (não altere em produção)
  DEV_MODE: true,
  API_TIMEOUT: 10000,
  
  // Configurações de fallback
  FALLBACK_IMAGE: 'https://images.unsplash.com/photo-1581092918484-8313d4c6e2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  DEFAULT_AUTHOR: 'Autor Desconhecido',
  DEFAULT_CATEGORY: 'Geral'
};

// Como usar:
// 1. Copie este arquivo para config.js
// 2. Altere as URLs para sua WordPress
// 3. Importe no wordpress.js: import { ENV_CONFIG } from './config.js'
// 4. Use: BASE_URL: ENV_CONFIG.WORDPRESS_API_URL
