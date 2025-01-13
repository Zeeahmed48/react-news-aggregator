import { useCallback, useEffect, useState } from 'react';

import { fetchFilteredNews, getGuradianNews, getNytNews } from '@/services';
import { isEmptyArray, transformSourceData } from '@/utils';

const usePreferedNews = (preferences: Preferences | null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [preferedNews, setPreferedNews] = useState<NewsArticle[]>([]);

  const shouldIncludeSource = useCallback(
    (source: Source) => {
      const sources = preferences?.selectedSources ?? [];

      return isEmptyArray(sources) || sources.includes(source);
    },
    [preferences?.selectedSources]
  );

  const fetchNewsFromSource = useCallback(
    async (source: Source, filters: PreferedFilters) => {
      switch (source) {
        case 'newsapi':
          return transformSourceData(await fetchFilteredNews(filters));
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
    []
  );

  const fetchPreferedNews = useCallback(async () => {
    if (preferences === null) return;

    const {
      selectedCategories: categories,
      selectedAuthors: authors,
      selectedSources: sources
    } = preferences;

    try {
      setIsLoading(true);

      const filters: PreferedFilters = { categories, authors };

      const newsPromises = sources
        .filter((source) => shouldIncludeSource(source))
        .map((source) => fetchNewsFromSource(source, filters));

      const results = await Promise.all(newsPromises);
      const allNews = results.flat();

      setPreferedNews(allNews);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [preferences, shouldIncludeSource, fetchNewsFromSource]);

  useEffect(() => {
    fetchPreferedNews();
  }, [fetchPreferedNews]);

  return { isLoading, error, preferedNews };
};

export default usePreferedNews;
