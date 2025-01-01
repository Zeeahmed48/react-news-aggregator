import { useEffect, useState } from 'react';

import { getNewsAPI } from '@/services';

const useAuthors = ({ skip }: { skip?: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [authors, setAuthors] = useState<string[]>([]);

  const fetchAuthors = async () => {
    try {
      setIsLoading(true);
      const news = await getNewsAPI({ query: 'latest' });

      const extractedAuthors = new Set<string>();

      news.articles.forEach(({ author }) => {
        if (author) extractedAuthors.add(author);
      });

      setAuthors(Array.from(extractedAuthors));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchAuthors();
  }, [skip]);

  return {
    isLoading,
    error,
    authors
  };
};

export default useAuthors;
