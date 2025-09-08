import { generateSitemapXML } from '../src/services/sitemapGenerator.js';

export default async function handler(req, res) {
  try {
    // Gerar sitemap dinamicamente
    const sitemapXML = await generateSitemapXML();
    
    // Definir headers apropriados
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600'); // Cache por 1 hora
    
    // Enviar o XML
    res.status(200).send(sitemapXML);
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
