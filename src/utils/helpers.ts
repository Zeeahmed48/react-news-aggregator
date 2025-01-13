import { NYT_BASE_URL } from '@/constants';

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = new Date(year, month, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formattedDate;
};

export const getOneMonthAgo = (): string => {
  const date = new Date();

  date.setMonth(date.getMonth() - 1);

  return formatDate(date);
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const mapToNewsArticle = (
  title: string,
  description: string,
  imgUrl: string,
  url: string,
  publishedAt: string
): NewsArticle => ({
  title,
  description,
  imgUrl,
  url,
  publishedAt
});

const transformGuardianNews = (news: GuardianNews): NewsArticle => {
  return mapToNewsArticle(
    news.webTitle,
    news.sectionName,
    news.fields.thumbnail,
    news.webUrl,
    news.webPublicationDate
  );
};

const transformGeneralNews = (news: News): NewsArticle => {
  return mapToNewsArticle(
    news.title,
    news.description,
    news.urlToImage,
    news.url,
    news.publishedAt
  );
};

const transformNytNews = (news: NytNews): NewsArticle => {
  const imgUrl = news.multimedia?.[0]?.url
    ? `${NYT_BASE_URL}/${news.multimedia[0].url}`
    : '';
  return mapToNewsArticle(
    news.snippet,
    news.abstract,
    imgUrl,
    news.web_url,
    news.pub_date
  );
};

type NewsSource = GuardianNews | News | NytNews;

export const transformSourceData = (data: NewsSource[]): NewsArticle[] => {
  return data.map((news) => {
    if ('webTitle' in news) {
      return transformGuardianNews(news);
    } else if ('urlToImage' in news) {
      return transformGeneralNews(news);
    } else {
      return transformNytNews(news);
    }
  });
};

export const shuffleArray = <T>(arr: T[]): T[] => {
  const tempArr = [...arr];

  for (let i = tempArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
  }

  return tempArr;
};

export const isEmptyArray = <T>(arr: T[]): boolean => {
  return arr.length === 0;
};

export const sanitizeParams = <T extends Record<string, unknown>>(
  params: T
): Partial<T> => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(params).filter(([_, value]) => {
      return value !== null && value !== undefined && value !== '';
    })
  ) as Partial<T>;
};

export const transformNewsApiArticlesToAuthorOptions = (
  articles: News[]
): Option[] => {
  const uniqueAuthors = new Set<string>();

  articles.forEach(({ author }) => {
    if (author) uniqueAuthors.add(author);
  });

  return Array.from(uniqueAuthors).map((author) => ({
    label: author,
    value: author
  }));
};

export const transformGuardianContributorsToOptions = (
  contributors: GuardianAuthor[]
): Option[] => {
  return contributors.map(({ id, webTitle }) => ({
    label: webTitle,
    value: id
  }));
};
