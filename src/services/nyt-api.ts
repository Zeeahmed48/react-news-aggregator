import { createAxiosInstance, fetchData } from '@/axios';
import { NYT_API_URL } from '@/constants';

const nytApiService = createAxiosInstance(NYT_API_URL);

export const getNytNews = async (filters: Filters) => {
  const { query = '', date, category } = filters ?? {};

  const params = {
    q: query,
    ...(date && { begin_date: date }),
    ...(category && { fq: `news_desk:("${category}")` })
  };

  return fetchData<NytResponse>(nytApiService, '/articlesearch.json', {
    params: {
      ...params,
      'api-key': import.meta.env.VITE_NYTIMES_API_KEY
    }
  });
};
