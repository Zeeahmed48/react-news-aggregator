import { useCallback, useEffect, useState } from 'react';

import { getGuradianNews, getNewsAPI, getNytNews } from '@/services';
import { shuffleArray, transformSourceData } from '@/utils';

type NewsHookOptions = {
  skip: boolean;
};

const useNews = (
  source: Source,
  filters: Filters,
  options?: NewsHookOptions
) => {
  const [areNewsLoading, setAreNewsLoading] = useState<boolean>(false);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string>('');

  const fetchNewsFromSource = useCallback(
    async (source: Source) => {
      switch (source) {
        case 'newsapi':
          return transformSourceData((await getNewsAPI(filters)).articles);
        case 'guardian':
          return transformSourceData(
            (await getGuradianNews(filters)).response.results
          );
        case 'nytimes':
          return transformSourceData((await getNytNews(filters)).response.docs);
        default:
          return [];
      }
    },
    [filters]
  );

  const fetchAllNews = useCallback(async () => {
    const newsPromises = [
      fetchNewsFromSource('newsapi'),
      fetchNewsFromSource('guardian'),
      fetchNewsFromSource('nytimes')
    ];
    const results = await Promise.all(newsPromises);
    return results.flat();
  }, [fetchNewsFromSource]);

  const fetchNews = useCallback(async () => {
    setAreNewsLoading(true);
    setError('');
    try {
      const news =
        source === ''
          ? await fetchAllNews()
          : await fetchNewsFromSource(source);
      setAllNews(shuffleArray(news));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setAreNewsLoading(false);
    }
  }, [fetchAllNews, fetchNewsFromSource, source]);

  useEffect(() => {
    if (options?.skip) {
      setAllNews([]);
      return;
    }

    fetchNews();
  }, [fetchNews, options?.skip]);

  return { areNewsLoading, allNews, error };
};

export default useNews;
