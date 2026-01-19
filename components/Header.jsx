import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { Menu, X, Search, BookOpen, Grid3X3, Users, Mail, Clock, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  // Detecta se estamos em páginas internas (não na home)
  const isInternalPage = router.pathname !== '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    router.push(`/blog/${post.slug}`)
    setIsSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const handleSobreClick = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    
    if (router.pathname === '/') {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const headerOffset = 80
        const elementPosition = aboutSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    } else {
      router.push('/?scrollTo=about')
    }
  }

  useEffect(() => {
    if (router.query.scrollTo === 'about') {
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          const headerOffset = 80
          const elementPosition = aboutSection.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
          
          router.replace('/', undefined, { shallow: true })
        }
      }, 300)
    }
  }, [router.query, router.pathname])

  const navItems = [
    { name: 'Início', href: '/', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Sobre', href: '#', icon: Users, isSpecial: true, handler: 'sobre' },
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
            <Link href="/" className="flex items-center">
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
                className={`2xl:hidden flex items-center space-x-2 font-medium transition-colors duration-300 hover:text-accent-600 ${
                  isScrolled || isInternalPage ? 'text-gray-900' : 'text-white'
                }`}
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
                    href={href}
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
                          href={href}
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
