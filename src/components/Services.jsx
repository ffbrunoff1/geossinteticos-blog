import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    /* SEÇÃO SERVICES DESABILITADA TEMPORARIAMENTE */
    null
  )
}