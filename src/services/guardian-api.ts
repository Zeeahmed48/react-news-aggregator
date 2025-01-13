import { createAxiosInstance, fetchData } from '@/axios';
import { GUARDIAN_API_URL } from '@/constants';
import { isEmptyArray, sanitizeParams } from '@/utils';

const guardianApiService = createAxiosInstance(GUARDIAN_API_URL);

type GuardianFilters = Filters & Partial<PreferedFilters>;

const buildGuardianSearchParams = (
  filters: GuardianFilters
): Record<string, string> => {
  const {
    query = '',
    date = '',
    category,
    authors = [],
    categories = []
  } = filters ?? {};

  const allSections: string[] = [];
  if (category) allSections.push(category);
  if (!isEmptyArray(categories)) allSections.push(...categories);

  return {
    q: query,
    from: date,
    ...(!isEmptyArray(authors) && { tag: authors.join(',') }),
    ...(!isEmptyArray(allSections) && { section: allSections.join('|') })
  };
};

export const getGuradianNews = async (filters: GuardianFilters) => {
  const rawParams = buildGuardianSearchParams(filters);
  const cleanParams = sanitizeParams(rawParams);

  return fetchData<GuardianResponse>(guardianApiService, '/search', {
    params: {
      ...cleanParams,
      'show-fields': 'thumbnail',
      'api-key': import.meta.env.VITE_GUARDIAN_API_KEY
    }
  });
};

export const getGuradianAuthors = async () => {
  return fetchData<GuardianAuthorsResponse>(guardianApiService, '/tags', {
    params: {
      type: 'contributor',
      'api-key': import.meta.env.VITE_GUARDIAN_API_KEY
    }
  });
};
