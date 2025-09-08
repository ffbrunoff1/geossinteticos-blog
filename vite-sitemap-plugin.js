import { generateSitemapXML } from './src/services/sitemapGenerator.js';

export function sitemapPlugin() {
  return {
    name: 'sitemap-plugin',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', async (req, res, next) => {
        try {
          // Gerar sitemap dinamicamente
          const sitemapXML = await generateSitemapXML();
          
          // Definir headers apropriados
          res.setHeader('Content-Type', 'application/xml');
          res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache por 1 hora
          
          // Enviar o XML
          res.end(sitemapXML);
        } catch (error) {
          console.error('Erro ao gerar sitemap:', error);
          res.statusCode = 500;
          res.end('Erro interno do servidor');
        }
      });
    }
  };
}
