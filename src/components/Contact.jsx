import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, User, AtSign } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Execute reCAPTCHA
      const token = await recaptchaRef.current.executeAsync()
      
      const response = await fetch('https://qotdwocbcoirjlqjkjhq.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token,
          recipientEmail: 'contato@geossinteticos.blog'
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      recaptchaRef.current.reset()
    }
  }

  const contactInfo = [
    // {
    //   icon: Mail,
    //   title: "E-mail",
    //   description: "contato@geossinteticos.blog",
    //   details: "Resposta em até 24h"
    // },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      description: "Segunda à Sexta: 8h às 18h",
      details: "Sábado: 8h às 12h"
    },
    {
      icon: MessageSquare,
      title: "Suporte Técnico",
      description: "Dúvidas sobre geossintéticos",
      details: "Especialistas à disposição"
    }
  ]

  const faqItems = [
    {
      question: "Como posso contribuir com artigos para o blog?",
      answer: "Enviamos guidelines para autores interessados. Entre em contato conosco através do formulário."
    },
    {
      question: "Vocês oferecem consultoria técnica?",
      answer: "Sim, nossa equipe oferece consultoria especializada em projetos com geossintéticos."
    },
    {
      question: "O conteúdo do blog é gratuito?",
      answer: "A maioria do conteúdo é gratuito. Alguns materiais premium requerem assinatura."
    },
    {
      question: "Como posso receber atualizações sobre novos artigos?",
      answer: "Assine nossa newsletter ou nos siga nas redes sociais para receber todas as atualizações."
    }
  ]

  return (
    <section id="contact" className="section-padding bg-white xl:pl-80">
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
            <MessageSquare size={16} className="mr-2" />
            Entre em Contato
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Conecte-se
            <span className="block gradient-text">Conosco</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem dúvidas sobre geossintéticos? Quer contribuir com conteúdo? 
            Nossa equipe de especialistas está pronta para ajudar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Envie sua Mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <AtSign size={16} className="inline mr-2" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors resize-vertical"
                    placeholder="Escreva sua mensagem aqui..."
                  ></textarea>
                </div>

                {/* reCAPTCHA */}
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6Lc7xpsrAAAAAKh0I1boee2JN1oO8iF_yd0ihl79"
                />

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg"
                  >
                    <CheckCircle size={20} className="mr-3" />
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-red-600 bg-red-50 p-4 rounded-lg"
                  >
                    <AlertCircle size={20} className="mr-3" />
                    Erro ao enviar mensagem. Tente novamente ou entre em contato por e-mail.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full btn-primary flex items-center justify-center ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 5 }}
                  className="card p-6 group"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow"
                    >
                      <info.icon size={20} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-600 mb-1">
                        {info.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {info.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="card p-6"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Perguntas Frequentes
              </h4>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <h5 className="font-medium text-gray-900 mb-2">
                      {faq.question}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-6"
            >
              <h4 className="font-semibold text-gray-900 mb-3">
                Mantenha-se Atualizado
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Receba nossos melhores conteúdos sobre geossintéticos diretamente em seu e-mail.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-700 transition-colors"
                >
                  Assinar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}