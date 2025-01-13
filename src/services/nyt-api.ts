import { createAxiosInstance, fetchData } from '@/axios';
import { NYT_API_URL } from '@/constants';
import { isEmptyArray, sanitizeParams } from '@/utils';

const nytApiService = createAxiosInstance(NYT_API_URL);

type NytFilters = Filters & Partial<PreferedFilters>;

export const getNytNews = async (filters: NytFilters) => {
  const {
    query = '',
    date,
    category,
    categories = [],
    authors = []
  } = filters ?? {};

  const filterQueries = [];

  if (!isEmptyArray(authors)) {
    const authQuery = `byline:(${authors.map((author) => `"${author}"`).join(' ')})`;
    filterQueries.push(authQuery);
  }

  if (!isEmptyArray(categories)) {
    const catQuery = `news_desk:(${categories
      .map((category) => `"${category}"`)
      .join(' ')})`;
    filterQueries.push(catQuery);
  }

  const params = {
    q: query,
    ...(date && { begin_date: date }),
    ...(category && { fq: `news_desk:("${category}")` }),
    ...(!isEmptyArray(filterQueries) && {
      fq: filterQueries.join(' AND ')
    })
  };

  const cleanParams = sanitizeParams(params);

  return fetchData<NytResponse>(nytApiService, '/articlesearch.json', {
    params: {
      ...cleanParams,
      'api-key': import.meta.env.VITE_NYTIMES_API_KEY
    }
  });
};
