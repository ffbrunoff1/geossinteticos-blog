import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Search, BookOpen, Grid3X3, Users, Mail, Clock, User } from 'lucide-react'
import { useWordPressPosts } from '../hooks/useWordPressPosts'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  // Buscar posts para pesquisa
  const { featuredPosts: allPosts } = useWordPressPosts(50)
  
  // Detecta se estamos em páginas internas (não na home)
  const isInternalPage = location.pathname !== '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Função de pesquisa em tempo real
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    // Simular delay para melhor UX
    const timeoutId = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim()
      const results = allPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      ).slice(0, 5) // Limitar a 5 resultados
      
      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, allPosts])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const handleSearchResultClick = (post) => {
    navigate(`/blog/${post.slug}`)
    setIsSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const handleSobreClick = (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      // Se não estiver na página inicial, navega para ela
      navigate('/')
      // Aguarda a navegação e depois faz scroll para a seção Sobre
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Se já estiver na página inicial, apenas faz scroll para a seção Sobre
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleInicioClick = () => {
    if (location.pathname !== '/') {
      // Se não estiver na página inicial, navega para ela
      navigate('/')
      // Aguarda a navegação e depois faz scroll para o topo
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      // Se já estiver na página inicial, apenas faz scroll para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBlogClick = () => {
    // Sempre navega para /blog limpo (sem parâmetros de pesquisa)
    navigate('/blog')
    // Aguarda a navegação e depois faz scroll para o topo
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const navItems = [
    { name: 'Início', href: '/', icon: BookOpen, isSpecial: true, handler: 'inicio' },
    { name: 'Blog', href: '/blog', icon: BookOpen, isSpecial: true, handler: 'blog' },
    // { name: 'Categorias', href: '#categories', icon: Grid3X3 },
    { name: 'Sobre', href: '#about', icon: Users, isSpecial: true, handler: 'sobre' },
    // { name: 'Contato', href: '#contact', icon: Mail }
  ]

  const categories = [
    'Geotêxtil não tecido',
    'Geotêxtil tecido', 
    'Geogrelha',
    'Geomembrana',
    'Geocélulas'
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isInternalPage
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <img
                  src="/logo-geossinteticos-blog.png"
                  alt="Geossintéticos.Blog"
                  className={`py-1 h-12 lg:h-16 w-auto transition-all duration-300 ${
                    !isScrolled && !isInternalPage ? 'brightness-0 invert' : ''
                  }`}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Botão para mostrar/ocultar sidebar em telas lg */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="2xl:hidden flex items-center space-x-2 font-medium transition-colors duration-300 hover:text-accent-600 text-gray-900"
              >
                <Grid3X3 size={18} />
                <span>Categorias</span>
              </button>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.isSpecial ? (
                    <button
                      onClick={() => {
                        if (item.handler === 'inicio') handleInicioClick()
                        else if (item.handler === 'blog') handleBlogClick()
                        else if (item.handler === 'sobre') handleSobreClick({ preventDefault: () => {} })
                      }}
                      className={`flex items-center space-x-2 font-medium transition-colors duration-300 hover:text-accent-600 ${
                        isScrolled || isInternalPage ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center space-x-2 font-medium transition-colors duration-300 hover:text-accent-600 ${
                        isScrolled || isInternalPage ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSearch}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled || isInternalPage
                    ? 'text-gray-900 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Search size={20} />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled || isInternalPage
                    ? 'text-gray-900 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-200 z-40"
            >
              <div className="container-custom p-4">
                <form onSubmit={handleSearchSubmit} className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Pesquisar artigos sobre geossintéticos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
                  >
                    Buscar
                  </button>
                </form>

                {/* Resultados da pesquisa */}
                {searchQuery.trim().length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-600"></div>
                        <span className="ml-2 text-gray-600">Buscando...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Resultados da pesquisa ({searchResults.length})
                        </h3>
                        {searchResults.map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleSearchResultClick(post)}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="text-accent-600" size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-accent-600 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <User size={12} className="mr-1" />
                                  {post.author}
                                </span>
                                <span className="flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  {post.readingTime}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <div className="pt-2 border-t border-gray-100">
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full text-center text-sm text-accent-600 hover:text-accent-700 font-medium py-2 hover:bg-accent-50 rounded-lg transition-colors"
                          >
                            Ver todos os resultados →
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="mx-auto text-gray-400 mb-2" size={24} />
                        <p className="text-gray-600 text-sm">Nenhum resultado encontrado</p>
                        <p className="text-gray-500 text-xs mt-1">Tente outros termos de busca</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="container-custom py-4">
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    item.isSpecial ? (
                      <motion.button
                        key={item.name}
                        onClick={() => {
                          if (item.handler === 'inicio') handleInicioClick()
                          else if (item.handler === 'blog') handleBlogClick()
                          else if (item.handler === 'sobre') handleSobreClick({ preventDefault: () => {} })
                          setIsMobileMenuOpen(false)
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 text-gray-900 hover:text-accent-600 font-medium py-2 transition-colors duration-300 w-full text-left"
                      >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                      </motion.button>
                    ) : (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-900 hover:text-accent-600 font-medium py-2 transition-colors duration-300"
                      >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                      </motion.a>
                    )
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Sidebar Categories - Desktop */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden 2xl:block fixed left-0 top-20 w-80 h-screen bg-white shadow-lg border-r border-gray-200 z-40 pt-8 overflow-y-auto"
      >
        {/* Conteúdo da sidebar desktop */}
        <div className="px-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Grid3X3 className="mr-2 text-accent-600" size={20} />
            Categorias
          </h3>
          <nav className="space-y-3">
            {categories.map((category, index) => {
              // Mapear nomes de categoria para slugs
              const categorySlugs = {
                'Geotêxtil não tecido': 'geotextil-nao-tecido',
                'Geotêxtil tecido': 'geotextil-tecido',
                'Geogrelha': 'geogrelha',
                'Geomembrana': 'geomembrana',
                'Geocélulas': 'geocelulas'
              };
              
              const slug = categorySlugs[category];
              const href = slug ? `/blog/categoria/${slug}` : '#';
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <Link
                    to={href}
                    className="block p-3 rounded-lg text-gray-700 hover:text-accent-600 hover:bg-accent-50 transition-all duration-300 font-medium"
                  >
                    {category}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Sidebar Categories - Mobile/Tablet (overlay) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 2xl:hidden"
            />
            
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-20 w-80 h-screen bg-white shadow-lg border-r border-gray-200 z-50 pt-8 overflow-y-auto 2xl:hidden"
            >
              <div className="px-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Grid3X3 className="mr-2 text-accent-600" size={20} />
                    Categorias
                  </h3>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="space-y-3">
                  {categories.map((category, index) => {
                    // Mapear nomes de categoria para slugs
                    const categorySlugs = {
                      'Geotêxtil não tecido': 'geotextil-nao-tecido',
                      'Geotêxtil tecido': 'geotextil-tecido',
                      'Geogrelha': 'geogrelha',
                      'Geomembrana': 'geomembrana',
                      'Geocélulas': 'geocelulas'
                    };
                    
                    const slug = categorySlugs[category];
                    const href = slug ? `/blog/categoria/${slug}` : '#';
                    
                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <Link
                          to={href}
                          onClick={() => setIsSidebarOpen(false)}
                          className="block p-3 rounded-lg text-gray-700 hover:text-accent-600 hover:bg-accent-50 transition-all duration-300 font-medium"
                        >
                          {category}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}