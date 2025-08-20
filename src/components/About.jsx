import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Award, BookOpen, TrendingUp, Globe, Shield, Lightbulb } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Precisão Técnica",
      description: "Conteúdo rigorosamente técnico baseado em normas e melhores práticas da engenharia geotécnica."
    },
    {
      icon: Lightbulb,
      title: "Inovação Constante",
      description: "Sempre à frente das últimas tecnologias e tendências em geossintéticos e soluções geotécnicas."
    },
    {
      icon: Users,
      title: "Comunidade Técnica",
      description: "Conectamos profissionais, estudantes e pesquisadores para troca de conhecimento especializado."
    },
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Informações verificadas por especialistas com anos de experiência prática no setor."
    }
  ]

  const achievements = [
    {
      number: "500+",
      label: "Artigos Técnicos",
      description: "Publicações especializadas"
    },
    {
      number: "50k+",
      label: "Leitores Mensais",
      description: "Profissionais engajados"
    },
    {
      number: "15+",
      label: "Especialistas",
      description: "Autores colaboradores"
    },
    {
      number: "5",
      label: "Anos de Experiência",
      description: "No mercado digital"
    }
  ]

  const expertiseAreas = [
    {
      title: "Geotêxteis",
      topics: ["Drenagem", "Filtração", "Reforço", "Separação"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Geomembranas", 
      topics: ["Impermeabilização", "Aterros Sanitários", "Reservatórios", "Proteção Ambiental"],
      color: "from-green-500 to-green-600"
    },
    {
      title: "Geogrelhas",
      topics: ["Pavimentação", "Reforço de Solo", "Estabilização", "Muros de Arrimo"],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Geocélulas",
      topics: ["Contenção de Taludes", "Erosão", "Estabilização", "Proteção Costeira"],
      color: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <section id="about" className="section-padding bg-white xl:pl-80">
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
            <BookOpen size={16} className="mr-2" />
            Sobre o Geossintéticos.Blog
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Referência em
            <span className="block gradient-text">Geotecnia Digital</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Há mais de 5 anos compartilhando conhecimento técnico especializado sobre 
            geossintéticos com profissionais da engenharia civil e geotecnia no Brasil e América Latina.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-gradient-to-br from-gray-50 to-accent-50 rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Nossa Missão
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Democratizar o acesso ao conhecimento técnico em geossintéticos, 
                fornecendo conteúdo de alta qualidade que acelere a inovação 
                e melhore a qualidade dos projetos de engenharia geotécnica.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-accent-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Globe size={16} className="text-white" />
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Award size={16} className="text-white" />
                  </div>
                </div>
                <span className="text-gray-600 font-medium">Comunidade Global de Especialistas</span>
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="bg-white rounded-xl shadow-xl p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      className="text-center p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg"
                    >
                      <div className="text-2xl font-bold text-accent-600 mb-1">
                        {achievement.number}
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {achievement.label}
                      </div>
                      <div className="text-xs text-gray-600">
                        {achievement.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <TrendingUp size={24} className="text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                >
                  <value.icon size={24} className="text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Áreas de Especialidade
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card overflow-hidden group"
              >
                <div className={`h-32 bg-gradient-to-br ${area.color} p-6 flex items-center justify-center`}>
                  <h4 className="text-xl font-bold text-white text-center">
                    {area.title}
                  </h4>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {area.topics.map((topic, topicIndex) => (
                      <motion.li
                        key={topic}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1 + topicIndex * 0.1, duration: 0.5 }}
                        className="text-gray-600 text-sm flex items-center"
                      >
                        <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                        {topic}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Faça Parte da Nossa Comunidade
            </h3>
            <p className="text-accent-100 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais que confiam no nosso conteúdo 
              para se manterem atualizados sobre as últimas tendências em geossintéticos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-accent-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explorar Artigos
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-accent-600 transition-colors"
              >
                Assinar Newsletter
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}