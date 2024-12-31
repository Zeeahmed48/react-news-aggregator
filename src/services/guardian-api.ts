import { createAxiosInstance, fetchData } from '@/axios';
import { GUARDIAN_API_URL } from '@/constants';

const guardianApiService = createAxiosInstance(GUARDIAN_API_URL);

export const getGuradianNews = async (filters: Filters) => {
  const { query, date, category } = filters ?? {};

  const params = {
    q: query || '',
    from: date || '',
    category: category || ''
  };

  return fetchData<GuardianResponse>(guardianApiService, '/search', {
    params: {
      ...params,
      'show-fields': 'thumbnail',
      'api-key': import.meta.env.VITE_GUARDIAN_API_KEY
    }
  });
};
