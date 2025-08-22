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
    /* SEÇÃO CONTACT DESABILITADA TEMPORARIAMENTE */
    null
  )
}