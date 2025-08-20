import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, BookOpen, Video, FileText, Download, ExternalLink, Clock, User, Star, ChevronRight, Search, Grid3X3 } from 'lucide-react'

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'Todos os Conteúdos', count: 156 },
    { id: 'geotextil', name: 'Geotêxtil', count: 45 },
    { id: 'geomembrana', name: 'Geomembrana', count: 38 },
    { id: 'geogrelha', name: 'Geogrelha', count: 32 },
    { id: 'geocelulas', name: 'Geocélulas', count: 28 },
    { id: 'normas', name: 'Normas e Regulamentos', count: 13 }
  ]

  const contentTypes = [
    { id: 'artigos', name: 'Artigos Técnicos', icon: FileText, color: 'blue' },
    { id: 'guias', name: 'Guias Práticos', icon: BookOpen, color: 'green' },
    { id: 'videos', name: 'Vídeos Educativos', icon: Video, color: 'purple' },
    { id: 'downloads', name: 'Downloads', icon: Download, color: 'orange' }
  ]

  const featuredContent = [
    {
      id: 1,
      title: "Manual Completo de Geotêxtil Não Tecido: Da Teoria à Prática",
      description: "Guia definitivo cobrindo propriedades, aplicações e critérios de seleção para geotêxteis não tecidos em projetos de engenharia.",
      category: "geotextil",
      type: "guias",
      readTime: "25 min",
      author: "Dr. João Silva",
      rating: 4.9,
      views: "12.5k",
      image: "https://qotdwocbcoirjlqjkjhq.supabase.co/storage/v1/object/public/user-files/ad5c31a2-f045-4f97-a0ab-2d4f0e6a69e7/1754519227247_6n4cx6ev80r_manta-geotextil-9-768x1024.jpg",
      premium: false,
      new: true,
      trending: true
    },
    {
      id: 2,
      title: "Geomembranas PEAD vs EPDM: Análise Comparativa Detalhada",
      description: "Comparação técnica entre geomembranas de PEAD e EPDM, incluindo propriedades, custos e adequação para diferentes aplicações.",
      category: "geomembrana",
      type: "artigos",
      readTime: "18 min",
      author: "Eng. Maria Santos",
      rating: 4.8,
      views: "8.9k",
      image: "https://qotdwocbcoirjlqjkjhq.supabase.co/storage/v1/object/public/user-files/ad5c31a2-f045-4f97-a0ab-2d4f0e6a69e7/1754519228442_l1p4yg284nn_geomembrana2.jpg",
      premium: true,
      new: false,
      trending: true
    },
    {
      id: 3,
      title: "Instalação de Geogrelhas: Técnicas e Boas Práticas",
      description: "Vídeo tutorial completo mostrando as melhores técnicas de instalação de geogrelhas em diferentes tipos de solo.",
      category: "geogrelha",
      type: "videos",
      readTime: "32 min",
      author: "Eng. Carlos Lima",
      rating: 4.7,
      views: "15.2k",
      image: "https://images.unsplash.com/photo-1590736969955-eefec7f3c10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      premium: false,
      new: true,
      trending: false
    },
    {
      id: 4,
      title: "Geocélulas em Projetos de Contenção: Estudo de Caso",
      description: "Análise detalhada de projeto real utilizando geocélulas para estabilização de talude em rodovia federal.",
      category: "geocelulas",
      type: "artigos",
      readTime: "22 min",
      author: "Prof. Ana Costa",
      rating: 4.6,
      views: "6.7k",
      image: "https://images.unsplash.com/photo-1581092918484-8313d4c6e2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      premium: false,
      new: false,
      trending: false
    },
    {
      id: 5,
      title: "NBR 12553: Especificações para Geotêxteis",
      description: "Download da norma brasileira atualizada com especificações técnicas para geotêxteis em obras de engenharia civil.",
      category: "normas",
      type: "downloads",
      readTime: "PDF - 45 pág",
      author: "ABNT",
      rating: 4.9,
      views: "22.1k",
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      premium: true,
      new: false,
      trending: true
    },
    {
      id: 6,
      title: "Cálculo de Dimensionamento para Geogrelhas Biaxiais",
      description: "Ferramenta interativa para cálculo de dimensionamento de geogrelhas biaxiais em pavimentação.",
      category: "geogrelha",
      type: "downloads",
      readTime: "Excel - 2MB",
      author: "Equipe Técnica",
      rating: 4.8,
      views: "9.4k",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      premium: false,
      new: true,
      trending: false
    }
  ]

  const filteredContent = featuredContent.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getTypeIcon = (type) => {
    const typeObj = contentTypes.find(t => t.id === type)
    return typeObj ? typeObj.icon : FileText
  }

  const getTypeColor = (type) => {
    const typeObj = contentTypes.find(t => t.id === type)
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return typeObj ? colors[typeObj.color] : colors.blue
  }

  return (
    <section id="services" className="section-padding bg-gray-50 xl:pl-80">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center bg-accent-50 text-accent-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Grid3X3 size={16} className="mr-2" />
            Biblioteca de Conhecimento
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Conteúdo
            <span className="block gradient-text">Especializado</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acesse nossa biblioteca completa com artigos técnicos, guias práticos, 
            vídeos educativos e downloads essenciais para profissionais de geotecnia.
          </p>
        </motion.div>

        {/* Content Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contentTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card p-6 text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getTypeColor(type.id)} group-hover:shadow-lg transition-shadow`}
              >
                <type.icon size={24} />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-accent-600 hover:text-accent-700 font-medium text-sm flex items-center mx-auto"
              >
                Explorar <ChevronRight size={14} className="ml-1" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por título, categoria ou palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-accent-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredContent.length} conteúdos encontrados
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter size={16} />
              <span>Ordenar por relevância</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredContent.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type)
                
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                    className="card overflow-hidden group cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          <TypeIcon size={12} className="inline mr-1" />
                          {contentTypes.find(t => t.id === item.type)?.name}
                        </span>
                        {item.new && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Novo
                          </span>
                        )}
                        {item.trending && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Trending
                          </span>
                        )}
                        {item.premium && (
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Premium
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Star size={12} className="text-yellow-400 mr-1" fill="currentColor" />
                        {item.rating}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <User size={12} className="mr-1" />
                              {item.author}
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {item.readTime}
                            </span>
                          </div>
                          <span>{item.views} visualizações</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full btn-primary flex items-center justify-center"
                        >
                          {item.type === 'downloads' ? (
                            <>
                              <Download size={16} className="mr-2" />
                              Baixar
                            </>
                          ) : item.type === 'videos' ? (
                            <>
                              <Video size={16} className="mr-2" />
                              Assistir
                            </>
                          ) : (
                            <>
                              <BookOpen size={16} className="mr-2" />
                              Ler
                            </>
                          )}
                          <ExternalLink size={14} className="ml-2" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          {filteredContent.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-8 py-3"
              >
                Carregar Mais Conteúdo
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 text-center"
        >
          <BookOpen className="mx-auto text-accent-200 mb-4" size={32} />
          <h3 className="text-2xl font-bold text-white mb-4">
            Não Perca Nenhum Conteúdo Novo
          </h3>
          <p className="text-accent-100 mb-6 max-w-2xl mx-auto">
            Receba notificações sempre que publicarmos novos artigos, guias e materiais 
            sobre geossintéticos e geotecnia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-accent-300"
            />
            <button className="bg-white text-accent-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Assinar
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}