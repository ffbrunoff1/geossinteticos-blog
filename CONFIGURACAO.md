# 🚀 Configuração Rápida - WordPress API

## ⚡ Setup em 3 Passos

### 1. Configurar URL da WordPress
Edite `src/config/wordpress.js`:
```javascript
export const WORDPRESS_CONFIG = {
  BASE_URL: 'https://SEU-WORDPRESS.com/wp-json/wp/v2',
  // ... resto permanece igual
};
```

### 2. Verificar se a API está funcionando
Acesse no navegador:
```
https://SEU-WORDPRESS.com/wp-json/wp/v2/posts
```
Deve retornar um JSON com posts.

### 3. Testar a aplicação
```bash
npm run dev
```

## 🔧 Configurações Avançadas

### Posts em Destaque
- **Opção A**: Marque posts como "fixos" (sticky) no WordPress
- **Opção B**: Crie categoria "destaque" e atribua aos posts
- **Opção C**: A API automaticamente busca posts recentes como fallback

### Imagens
- Defina imagem destacada para cada post no WordPress
- A API extrai automaticamente a URL da imagem

### Categorias
- Posts aparecem com suas categorias reais do WordPress
- Fallback para "Geral" se não houver categoria

## 🚨 Problemas Comuns

### Erro: "Nenhum artigo encontrado"
1. ✅ Verifique se a URL da API está correta
2. ✅ Confirme se há posts publicados no WordPress
3. ✅ Teste a API diretamente no navegador

### Erro: "Erro ao carregar posts"
1. ✅ Verifique se a REST API está habilitada
2. ✅ Confirme permissões de leitura dos posts
3. ✅ Verifique logs do console do navegador

### Imagens não aparecem
1. ✅ Confirme se os posts têm imagens destacadas
2. ✅ Verifique se as URLs das imagens são acessíveis
3. ✅ Confirme permissões de mídia no WordPress

## 📱 Teste a Integração

1. **Carregamento**: Posts devem aparecer automaticamente
2. **Links**: Clique nos posts deve abrir o WordPress
3. **Atualização**: Botão "Atualizar" deve recarregar posts
4. **Responsivo**: Layout deve funcionar em mobile e desktop

## 🎯 Próximos Passos

- [ ] Configurar URL da sua WordPress
- [ ] Testar se a API está funcionando
- [ ] Verificar se posts aparecem
- [ ] Testar links para o WordPress
- [ ] Personalizar layout se necessário

## 📞 Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Confirme se a URL da API está correta
3. Teste a API diretamente no navegador
4. Verifique se há posts publicados no WordPress
