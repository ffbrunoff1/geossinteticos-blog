import { generateSitemapXML } from './src/services/sitemapGenerator.js';
import fs from 'fs';
import path from 'path';

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
    },
    async writeBundle() {
      try {
        console.log('Gerando sitemap.xml estático (fallback)...');
        const sitemapXML = await generateSitemapXML();
        
        // Criar o arquivo sitemap.xml no diretório dist como fallback
        const outputPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
        fs.writeFileSync(outputPath, sitemapXML);
        
        console.log('✅ sitemap.xml estático gerado com sucesso!');
        console.log('ℹ️  Sitemap dinâmico disponível em /api/sitemap');
      } catch (error) {
        console.error('❌ Erro ao gerar sitemap.xml:', error);
      }
    }
  };
}
