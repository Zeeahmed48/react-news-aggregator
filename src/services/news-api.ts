import { createAxiosInstance, fetchData } from '@/axios';
import { NEWS_API_URL } from '@/constants';
import { isEmptyArray, sanitizeParams } from '@/utils';

const newsApiService = createAxiosInstance(NEWS_API_URL, {
  headers: { Authorization: import.meta.env.VITE_NEWS_API_KEY }
});

export const fetchFilteredNews = async (filters: {
  categories: string[];
  authors: string[];
}) => {
  const { categories, authors } = filters ?? {};

  let allArticles: News[] = [];

  if (!isEmptyArray(categories)) {
    for (const category of categories) {
      const articles = (await getNewsAPI({ category })).articles;
      allArticles = [...allArticles, ...articles];
    }
  } else {
    allArticles = (await getNewsAPI({ query: 'latest' })).articles;
  }

  if (!isEmptyArray(authors)) {
    allArticles = allArticles.filter((article) => {
      if (!article.author) return false;

      return authors.some((author) =>
        article.author?.toLowerCase().includes(author.toLowerCase())
      );
    });
  }

  return allArticles;
};

export const getNewsAPI = async (filters?: Filters) => {
  const { query = '', date = '', category = '' } = filters ?? {};
  const params = {
    q: query,
    from: date,
    category
  };

  const cleanParams = sanitizeParams(params);

  return fetchData<NewsResponse>(newsApiService, '/top-headlines', {
    params: cleanParams
  });
};
