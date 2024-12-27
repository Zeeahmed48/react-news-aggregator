import { createAxiosInstance, fetchData } from '@/axios';
import { NEWS_API_URL } from '@/constants';

const newsApiService = createAxiosInstance(NEWS_API_URL, {
  headers: { Authorization: import.meta.env.VITE_NEWS_API_KEY }
});

export const getTopNews = async (): Promise<NewsResponse> => {
  return fetchData<NewsResponse>(newsApiService, '/top-headlines', {
    params: {
      sources: 'bbc-news',
      pageSize: 10,
      page: 1
    }
  });
};
