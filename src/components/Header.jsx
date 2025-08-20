import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, BookOpen, Grid3X3, Users, Mail } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Detecta se estamos em páginas internas (não na home)
  const isInternalPage = location.pathname !== '/'

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
    setSearchQuery('')
  }

  const navItems = [
    { name: 'Início', href: '/', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Categorias', href: '#categories', icon: Grid3X3 },
    { name: 'Sobre', href: '#about', icon: Users },
    { name: 'Contato', href: '#contact', icon: Mail }
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img
                src="/logo-geossinteticos-blog.png"
                alt="Geossintéticos.Blog"
                className={`h-12 lg:h-16 w-auto transition-all duration-300 ${
                  !isScrolled && !isInternalPage ? 'brightness-0 invert' : ''
                }`}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 font-medium transition-colors duration-300 hover:text-accent-600 ${
                        isScrolled || isInternalPage ? 'text-gray-900' : 'text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </Link>
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
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-200 p-4"
            >
              <div className="container-custom">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Pesquisar artigos sobre geossintéticos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                    autoFocus
                  />
                </div>
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
        className="hidden xl:block fixed left-0 top-20 w-80 h-screen bg-white shadow-lg border-r border-gray-200 z-40 pt-8"
      >
        <div className="px-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Grid3X3 className="mr-2 text-accent-600" size={20} />
            Categorias
          </h3>
          <nav className="space-y-3">
            {categories.map((category, index) => (
              <motion.a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="block p-3 rounded-lg text-gray-700 hover:text-accent-600 hover:bg-accent-50 transition-all duration-300 font-medium"
              >
                {category}
              </motion.a>
            ))}
          </nav>
          
          <div className="mt-8 p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-3">Receba os melhores conteúdos sobre geotecnia</p>
            <button className="w-full btn-primary text-sm py-2">
              Assinar Newsletter
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}