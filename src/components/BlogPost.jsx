import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, BookOpen } from 'lucide-react';
import { usePostBySlug } from '../hooks/usePostBySlug';

const BlogPost = () => {
  const { slug } = useParams();
  const { post, loading, error } = usePostBySlug(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom">
          <div className="text-center py-16">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">O post que você está procurando não existe ou foi removido.</p>
            <Link 
              to="/"
              className="inline-flex items-center bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8 mt-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-accent-600 transition-colors">
                Início
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-accent-600 transition-colors">
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{post.title}</span>
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Imagem destacada */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Categoria */}
              <div className="absolute top-6 left-6">
                <span className="bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>

              {/* Botão voltar */}
              <div className="absolute top-6 right-6">
                <Link 
                  to="/"
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft size={20} />
                </Link>
              </div>
            </div>

            {/* Informações do post */}
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta informações */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center">
                  <Tag size={16} className="mr-2" />
                  <span>{post.category}</span>
                </div>
              </div>

              {/* Conteúdo do post */}
              {post.content ? (
                <div 
                  className="text-xl text-gray-600 mb-8 leading-relaxed text-justify prose prose-lg max-w-none [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-6 [&_h2]:leading-tight [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:my-4 [&_ol]:my-4 [&_li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">Conteúdo completo não disponível</p>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button className="flex items-center bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg transition-colors">
                  <Share2 size={16} className="mr-2" />
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Footer do post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gostou do artigo?</h3>
              <p className="text-gray-600">Compartilhe com seus colegas e amigos</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
