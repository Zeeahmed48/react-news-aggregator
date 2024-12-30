import { useCallback, useEffect, useState } from 'react';

import { getNewsAPI } from '@/services';

type NewsHookOptions = {
  skip: boolean;
};

const useNews = (
  source: Source,
  filters: Filters,
  options?: NewsHookOptions
) => {
  const [areNewsLoading, setAreNewsLoading] = useState<boolean>(false);
  const [allNews, setAllNews] = useState<News[]>([]);
  const [error, setError] = useState<string>('');

  const fetchNews = useCallback(async () => {
    setAreNewsLoading(true);
    setError('');
    try {
      let news: News[] = [];
      if (!source || source === 'newsapi') {
        news = (await getNewsAPI(filters)).articles;
      }
      setAllNews(news);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setAreNewsLoading(false);
    }
  }, [source, filters]);

  useEffect(() => {
    if (options?.skip) return setAllNews([]);

    fetchNews();
  }, [fetchNews, options?.skip]);

  return { areNewsLoading, allNews, error };
};

export default useNews;
