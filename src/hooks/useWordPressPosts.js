import { useState, useEffect, useCallback } from 'react';
import { getFeaturedPosts, getPostsByCategory, getPost } from '../services/wordpressService';

export const useWordPressPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar posts em destaque
  const fetchFeaturedPosts = useCallback(async (limit = 4) => {
    try {
      setLoading(true);
      setError(null);
      const posts = await getFeaturedPosts(limit);
      setFeaturedPosts(posts);
    } catch (err) {
      setError('Erro ao carregar posts em destaque');
      console.error('Erro ao buscar posts em destaque:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar posts por categoria
  const fetchPostsByCategory = useCallback(async (categorySlug, limit = 6) => {
    try {
      setLoading(true);
      setError(null);
      const posts = await getPostsByCategory(categorySlug, limit);
      return posts;
    } catch (err) {
      setError(`Erro ao carregar posts da categoria ${categorySlug}`);
      console.error(`Erro ao buscar posts da categoria ${categorySlug}:`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar post específico
  const fetchPost = useCallback(async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const post = await getPost(postId);
      return post;
    } catch (err) {
      setError(`Erro ao carregar post ${postId}`);
      console.error(`Erro ao buscar post ${postId}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar posts em destaque ao montar o componente
  useEffect(() => {
    fetchFeaturedPosts();
  }, [fetchFeaturedPosts]);

  // Função para recarregar posts
  const refreshPosts = useCallback(() => {
    fetchFeaturedPosts();
  }, [fetchFeaturedPosts]);

  return {
    featuredPosts,
    loading,
    error,
    fetchFeaturedPosts,
    fetchPostsByCategory,
    fetchPost,
    refreshPosts,
  };
};

// Hook específico para posts em destaque
export const useFeaturedPosts = (limit = 4) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const featuredPosts = await getFeaturedPosts(limit);
        setPosts(featuredPosts);
      } catch (err) {
        setError('Erro ao carregar posts em destaque');
        console.error('Erro ao buscar posts em destaque:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [limit]);

  return { posts, loading, error };
};
