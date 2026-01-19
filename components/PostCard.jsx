import React from 'react';
import Link from 'next/link';
import { User, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const PostCard = ({ post, isMain = false, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  if (isMain) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <article 
          className="lg:row-span-2 card overflow-hidden group cursor-pointer"
          onClick={handleClick}
        >
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            {post.trending && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <TrendingUp size={12} className="mr-1" />
                Trending
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <User size={14} className="mr-1" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {post.readTime}
              </span>
            </div>
            <span>{post.date}</span>
          </div>
          <div className="mt-4 flex items-center text-accent-600 text-sm font-medium group-hover:text-accent-700 transition-colors">
            Ler artigo completo
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <article 
        className="card overflow-hidden group cursor-pointer"
        onClick={handleClick}
      >
      <div className="flex">
        <div className="w-32 h-24 flex-shrink-0 overflow-hidden">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent-600 text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-400 text-xs">{post.date}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <User size={12} className="mr-1" />
            <span className="mr-3">{post.author}</span>
            <Clock size={12} className="mr-1" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center text-accent-600 text-xs font-medium group-hover:text-accent-700 transition-colors">
            Ler mais
            <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
        </article>
      </Link>
    );
  };

export default PostCard;
