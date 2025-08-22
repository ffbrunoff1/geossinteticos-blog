import React from 'react'
import { motion } from 'framer-motion'
import { Clock, User, ArrowRight, TrendingUp, BookOpen, Star, RefreshCw } from 'lucide-react'
import { useFeaturedPosts } from '../hooks/useWordPressPosts'
import PostCard from './PostCard'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { posts: featuredPosts, loading, error, refreshPosts } = useFeaturedPosts(4)

  const stats = [
    { number: "500+", label: "Artigos Publicados" },
    { number: "50k+", label: "Leitores Mensais" },
    { number: "15+", label: "Especialistas" },
    { number: "5", label: "Anos de Experiência" }
  ]

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 xl:pl-80">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-600/20 to-primary-600/20"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 lg:py-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center bg-accent-600/10 px-4 py-2 rounded-full text-sm text-white font-medium mb-6"
          >
            <TrendingUp size={16} className="mr-2" />
            Portal Líder em Geotecnia
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            Geossintéticos
            <span className="block gradient-text">em Foco</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Conteúdo técnico especializado sobre geossintéticos, geotecnia e engenharia civil. 
            Mantenha-se atualizado com as últimas tendências e tecnologias do setor.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Posts Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="pb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center">
              <BookOpen className="mr-3 text-accent-500" size={28} />
              Artigos em Destaque
            </h2>
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={refreshPosts}
                className="text-white hover:text-accent-300 font-medium flex items-center"
                disabled={loading}
              >
                <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </motion.button>
              <Link to="/blog">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="text-white hover:text-accent-300 font-medium flex items-center"
                >
                  Ver todos <ArrowRight size={16} className="ml-1" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-16"
            >
              <div className="text-center">
                <RefreshCw className="mx-auto text-accent-400 animate-spin mb-4" size={32} />
                <p className="text-gray-300">Carregando artigos...</p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center"
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
          {!loading && !error && featuredPosts.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Featured Post */}
              {featuredPosts[0] && (
                <PostCard 
                  post={featuredPosts[0]} 
                  isMain={true}
                />
              )}

              {/* Secondary Posts */}
              <div className="space-y-6">
                {featuredPosts.slice(1).map((post, index) => (
                  <PostCard 
                    key={post.id}
                    post={post}
                    isMain={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && featuredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-300 text-lg mb-2">Nenhum artigo encontrado</p>
              <p className="text-gray-400">Tente atualizar a página ou verificar a configuração da API.</p>
            </motion.div>
          )}


        </motion.div>
      </div>
    </section>
  )
}