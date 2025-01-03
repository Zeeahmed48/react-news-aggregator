import { createAxiosInstance, fetchData } from '@/axios';
import { NEWS_API_URL } from '@/constants';

const newsApiService = createAxiosInstance(NEWS_API_URL, {
  headers: { Authorization: import.meta.env.VITE_NEWS_API_KEY }
});

export const fetchNewsAPITopNews = async (filters: {
  categories: string[];
}) => {
  return fetchData<NewsResponse>(newsApiService, '/top-headlines', {
    params: {
      category: filters.categories.join(',')
    }
  });
};

export const getNewsAPI = async (filters?: Filters) => {
  const { query, date, category } = filters ?? {};
  const params = {
    q: query ?? '',
    from: date ?? '',
    category: category ?? ''
  };

  return fetchData<NewsResponse>(newsApiService, '/everything', {
    params
  });
};
