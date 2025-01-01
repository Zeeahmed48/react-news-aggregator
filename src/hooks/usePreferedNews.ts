import { useCallback, useEffect, useState } from 'react';

import { fetchNewsAPITopNews } from '@/services';
import { transformSourceData } from '@/utils';

const usePreferedNews = (preferences: Preferences | null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [preferedNews, setPreferedNews] = useState<NewsArticle[]>([]);

  const fetchPreferedNews = useCallback(async () => {
    if (preferences === null) return;

    try {
      setIsLoading(true);
      const news = transformSourceData(
        (
          await fetchNewsAPITopNews({
            categories: preferences.selectedCategories
          })
        ).articles
      );

      setPreferedNews(news);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [preferences]);

  useEffect(() => {
    fetchPreferedNews();
  }, [fetchPreferedNews]);

  return { isLoading, error, preferedNews };
};

export default usePreferedNews;
