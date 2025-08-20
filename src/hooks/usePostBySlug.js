import { useState, useEffect } from 'react';
import { getPostBySlug } from '../services/wordpressService';

export const usePostBySlug = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const postData = await getPostBySlug(slug);
        
        if (postData) {
          setPost(postData);
        } else {
          setError('Post não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o post');
        console.error('Erro ao buscar post por slug:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};
