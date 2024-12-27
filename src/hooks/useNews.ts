import { useEffect, useState } from 'react';

import { getTopNews } from '@/services';

const useNews = () => {
  const [areNewsLoading, setAreNewsLoading] = useState<boolean>(false);
  const [allNews, setAllNews] = useState<News[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setAreNewsLoading(true);
    getTopNews()
      .then((news) => {
        setAllNews(news.articles);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setAreNewsLoading(false);
      });
  }, []);

  return { areNewsLoading, allNews, error };
};

export default useNews;
