import { createAxiosInstance, fetchData } from '@/axios';
import { NYT_API_URL } from '@/constants';
import { formatDate } from '@/utils';

const nytApiService = createAxiosInstance(NYT_API_URL);

export const getNytNews = async (filters: Filters) => {
  const { query, date, category } = filters ?? {};

  const params = {
    q: query || '',
    begin_date: date || '',
    end_date: formatDate(new Date()),
    category: category || ''
  };

  return fetchData<NytResponse>(nytApiService, '/articlesearch.json', {
    params: {
      ...params,
      'api-key': import.meta.env.VITE_NYTIMES_API_KEY
    }
  });
};
