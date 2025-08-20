# Blog de Geossintéticos - Frontend

Este é o frontend de um blog especializado em geossintéticos, geotecnia e engenharia civil, integrado com a WordPress API.

## 🚀 Funcionalidades

- **Integração com WordPress API**: Posts em destaque carregados dinamicamente
- **Design Responsivo**: Interface moderna e adaptável a diferentes dispositivos
- **Animações**: Transições suaves com Framer Motion
- **Estados de Loading**: Feedback visual durante carregamento
- **Tratamento de Erros**: Interface para lidar com falhas na API
- **Links Diretos**: Clique nos posts redireciona para o WordPress

## 🛠️ Configuração da WordPress API

### 1. Configurar URL da WordPress

Edite o arquivo `src/config/wordpress.js` e altere a URL base:

```javascript
export const WORDPRESS_CONFIG = {
  // Substitua pela URL do seu WordPress
  BASE_URL: 'https://seu-wordpress.com/wp-json/wp/v2',
  // ... resto da configuração
};
```

### 2. Verificar Endpoints da API

Certifique-se de que sua WordPress tenha a REST API habilitada e acessível em:
- `https://seu-wordpress.com/wp-json/wp/v2/posts`
- `https://seu-wordpress.com/wp-json/wp/v2/categories`
- `https://seu-wordpress.com/wp-json/wp/v2/media`

### 3. Configurar Posts em Destaque

Para que os posts apareçam na seção "Artigos em Destaque", você pode:

**Opção A: Usar Posts Sticky (Fixos)**
- No WordPress, marque os posts desejados como "fixos" (sticky)
- A API automaticamente buscará esses posts

**Opção B: Usar Categoria Específica**
- Crie uma categoria chamada "Destaque" ou similar
- Atribua essa categoria aos posts que devem aparecer
- Modifique o serviço para buscar por essa categoria

### 4. Configurar Imagens Destacadas

Para que as imagens apareçam corretamente:
- Defina uma imagem destacada para cada post no WordPress
- A API automaticamente extrairá a URL da imagem

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Dependências

- **React 18**: Framework principal
- **Framer Motion**: Animações e transições
- **Tailwind CSS**: Estilização
- **Axios**: Cliente HTTP para API
- **date-fns**: Formatação de datas
- **Lucide React**: Ícones

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Hero.jsx          # Componente principal com posts em destaque
│   ├── PostCard.jsx      # Card individual de post
│   └── ...               # Outros componentes
├── hooks/
│   └── useWordPressPosts.js  # Hook para gerenciar posts
├── services/
│   └── wordpressService.js   # Serviço da API WordPress
├── config/
│   └── wordpress.js      # Configuração da API
└── App.jsx               # Componente raiz
```

## 🌐 Como Funciona a Integração

1. **Carregamento Inicial**: O hook `useFeaturedPosts` busca posts em destaque da WordPress API
2. **Formatação**: Os dados são formatados para o formato esperado pelo frontend
3. **Renderização**: Os posts são exibidos usando o componente `PostCard`
4. **Interação**: Clique em um post redireciona para o WordPress em nova aba
5. **Atualização**: Botão "Atualizar" permite recarregar os posts

## 🔍 Personalização

### Alterar Número de Posts
```javascript
// No Hero.jsx
const { posts: featuredPosts, loading, error, refreshPosts } = useFeaturedPosts(6) // 6 posts
```

### Modificar Layout dos Posts
Edite o componente `PostCard.jsx` para alterar a aparência dos cards.

### Adicionar Novas Funcionalidades
- Busca por categoria
- Paginação
- Filtros
- Cache local

## 🚨 Solução de Problemas

### Posts não aparecem
1. Verifique se a URL da API está correta
2. Confirme se a WordPress tem posts publicados
3. Verifique se a REST API está habilitada

### Imagens não carregam
1. Confirme se os posts têm imagens destacadas
2. Verifique se as URLs das imagens são acessíveis
3. Confirme permissões de mídia no WordPress

### Erro de CORS
1. Configure o WordPress para permitir requisições do seu domínio
2. Use um proxy se necessário

## 📝 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
