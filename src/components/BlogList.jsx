import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, ArrowRight } from 'lucide-react';
import { useWordPressPosts } from '../hooks/useWordPressPosts';
import PostCard from './PostCard';
import { useSearchParams, useParams } from 'react-router-dom';

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const { featuredPosts: posts, loading, error, refreshPosts } = useWordPressPosts(30);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const postsPerLoad = 12;

  // Mapeamento de slugs para nomes de categoria
  const categoryMapping = {
    'geotextil-nao-tecido': 'Geotêxtil não tecido',
    'geotextil-tecido': 'Geotêxtil tecido',
    'geogrelha': 'Geogrelha',
    'geomembrana': 'Geomembrana',
    'geocelulas': 'Geocélulas'
  };

  // Sincronizar com parâmetros da URL e rota
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    
    // Se há uma categoria na URL, usar como termo de busca
    if (category && categoryMapping[category]) {
      setSearchTerm(categoryMapping[category]);
      // Scroll para o topo quando mudar de categoria
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Se não há categoria na URL mas há parâmetro de busca, usar o parâmetro
    else if (urlSearch) {
      setSearchTerm(urlSearch);
      // Scroll para o topo quando mudar a busca
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams, category]);

  // Atualizar URL quando buscar
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      setSearchParams({ search: value.trim() });
      // Scroll para o topo quando fizer uma nova busca
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSearchParams({});
    }
  };

  // Filtrar posts baseado na busca e categoria (memoized)
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  // Função para carregar mais posts
  const loadMorePosts = useCallback(() => {
    if (isLoadingMore || displayedPosts.length >= filteredPosts.length) {
      return;
    }
    
    setIsLoadingMore(true);
    
    // Carregamento instantâneo
    setDisplayedPosts(prev => {
      const nextBatch = filteredPosts.slice(prev.length, prev.length + postsPerLoad);
      return [...prev, ...nextBatch];
    });
    setIsLoadingMore(false);
  }, [filteredPosts.length, isLoadingMore, postsPerLoad]);


  // Obter categorias únicas
  const categories = [...new Set(posts.map(post => post.category))];

  // Initialize displayed posts when posts are loaded
  useEffect(() => {
    if (posts.length > 0 && displayedPosts.length === 0) {
      const initialPosts = filteredPosts.slice(0, postsPerLoad);
      setDisplayedPosts(initialPosts);
    }
  }, [posts.length, displayedPosts.length, filteredPosts.length, postsPerLoad]);

  // Reset displayed posts when filters change
  useEffect(() => {
    const resetPosts = filteredPosts.slice(0, postsPerLoad);
    setDisplayedPosts(resetPosts);
  }, [searchTerm, selectedCategory, filteredPosts.length, postsPerLoad]);

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const threshold = 500;
      
      if (scrollTop + windowHeight >= documentHeight - threshold) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="lg:ml-0 2xl:ml-80">
        <div className="container-custom">
        {/* Header da página */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 lg:py-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center bg-accent-600/10 text-accent-400 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <BookOpen size={16} className="mr-2" />
            Blog de Geossintéticos
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Artigos e
            <span className="block gradient-text">Publicações</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Conteúdo técnico especializado sobre geossintéticos, geotecnia e engenharia civil. 
            Mantenha-se atualizado com as últimas tendências e tecnologias do setor.
          </motion.p>
        </motion.div>

        {/* Filtros e Busca */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white"
              />
            </div>

            {/* Filtro de categoria */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-gray-900 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Botão atualizar */}
            <button
              onClick={refreshPosts}
              disabled={loading}
              className="h-12 px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-16"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando artigos...</p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center mb-8"
          >
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={refreshPosts}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </motion.div>
        )}


        {/* Posts Grid */}
        {!loading && !error && displayedPosts.length > 0 && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 grid-auto-rows-fr transition-all duration-0">
            {displayedPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PostCard post={post} isMain={false} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum artigo encontrado</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory 
                ? 'Tente ajustar os filtros de busca ou categoria.'
                : 'Não há artigos disponíveis no momento.'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSearchParams({});
              }}
              className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}

        {/* Load More Button */}
        {!loading && !error && displayedPosts.length > 0 && displayedPosts.length < filteredPosts.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center mt-12 mb-16"
          >
            <button
              onClick={loadMorePosts}
              disabled={isLoadingMore}
              className="px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Carregando...</span>
                </>
              ) : (
                <>
                  <span>Carregar mais artigos</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* End of Posts Message */}
        {!loading && !error && displayedPosts.length > 0 && displayedPosts.length === filteredPosts.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-12 mb-16"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <BookOpen className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-600 font-medium">Você viu todos os artigos disponíveis!</p>
              <p className="text-gray-500 text-sm mt-1">Volte em breve para novos conteúdos.</p>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
