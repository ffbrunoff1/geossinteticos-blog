import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronUp, Mail, MapPin, Clock, ExternalLink, BookOpen, FileText, Users, MessageSquare } from 'lucide-react'

export default function Footer() {
  const footerSections = [
            {
          title: "Categorias",
          links: [
            { name: "Geotêxtil não tecido", href: "/blog/categoria/geotextil-nao-tecido" },
            { name: "Geotêxtil tecido", href: "/blog/categoria/geotextil-tecido" },
            { name: "Geogrelha", href: "/blog/categoria/geogrelha" },
            { name: "Geomembrana", href: "/blog/categoria/geomembrana" },
            { name: "Geocélulas", href: "/blog/categoria/geocelulas" }
          ]
        },
    {
      title: "Contato",
      links: [
        // { 
        //   name: "contato@geossinteticos.blog", 
        //   href: "mailto:contato@geossinteticos.blog", 
        //   icon: Mail,
        //   isContact: true
        // },
        { 
          name: "Segunda à Sexta: 8h às 18h", 
          href: "#", 
          icon: Clock,
          isContact: true
        },
        { 
          name: "Suporte Técnico", 
          href: "#contact", 
          icon: MessageSquare,
          isContact: true
        }
      ]
    }
  ]

  const quickStats = [
    { number: "500+", label: "Artigos Publicados" },
    { number: "50k+", label: "Leitores Mensais" },
    { number: "15+", label: "Especialistas" },
    { number: "5", label: "Anos Online" }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white xl:pl-80">
      {/* Main Footer Content */}
      <div className="container-custom">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-b border-gray-800 py-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl font-bold text-accent-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Logo and Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <img
                  src="/logo-geossinteticos-blog.png"
                  alt="Geossintéticos.Blog"
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Portal líder em conteúdo técnico sobre geossintéticos e geotecnia. 
                Conectamos profissionais, compartilhamos conhecimento e impulsionamos 
                a inovação no setor de engenharia civil.
              </p>
              

            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (sectionIndex + 1) * 0.1, duration: 0.8 }}
              >
                <h3 className="font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (sectionIndex + 1) * 0.1 + linkIndex * 0.05, duration: 0.5 }}
                    >
                      {link.href.startsWith('/') ? (
                        <motion.div whileHover={{ x: 5 }}>
                          <Link
                            to={link.href}
                            className={`flex items-center text-gray-400 hover:text-accent-400 transition-colors text-sm ${
                              link.isContact ? 'mb-1' : ''
                            }`}
                          >
                            {link.icon && (
                              <link.icon size={14} className="mr-2 flex-shrink-0" />
                            )}
                            {link.name}
                            {!link.isContact && (
                              <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.a
                          href={link.href}
                          whileHover={{ x: 5 }}
                          className={`flex items-center text-gray-400 hover:text-accent-400 transition-colors text-sm ${
                            link.isContact ? 'mb-1' : ''
                          }`}
                        >
                          {link.icon && (
                            <link.icon size={14} className="mr-2 flex-shrink-0" />
                          )}
                          {link.name}
                          {!link.isContact && (
                            <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </motion.a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>
                © {new Date().getFullYear()} Geossintéticos Blog. Todos os direitos reservados.
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/privacidade"
                  className="hover:text-accent-400 transition-colors"
                >
                  Privacidade
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-accent-600 text-white p-3 rounded-full shadow-lg hover:bg-accent-700 transition-colors z-50"
        style={{ display: 'block' }}
      >
        <ChevronUp size={20} />
      </motion.button>
    </footer>
  )
}