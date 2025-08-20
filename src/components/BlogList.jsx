import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, ArrowRight } from 'lucide-react';
import { useWordPressPosts } from '../hooks/useWordPressPosts';
import PostCard from './PostCard';

const BlogList = () => {
  const { featuredPosts: posts, loading, error, refreshPosts } = useWordPressPosts(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtrar posts baseado na busca e categoria
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obter categorias únicas
  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>

            {/* Filtro de categoria */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
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
              className="px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors disabled:opacity-50"
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
        {!loading && !error && filteredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <PostCard post={post} isMain={false} />
              </motion.div>
            ))}
          </motion.div>
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
              }}
              className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}

        {/* Paginação (futuro) */}
        {!loading && !error && filteredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Anterior
              </button>
              <span className="px-4 py-2 text-gray-600">Página 1 de 1</span>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Próxima
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
