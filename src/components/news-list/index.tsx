import { FC, ReactElement } from 'react';

import { EmptyResult, NewsCard } from '@/components';
import { withLoader } from '@/hocs';

import './style.css';

const NewsList: FC<{ data: NewsArticle[] }> = ({ data }): ReactElement => {
  if (data.length === 0) {
    return <EmptyResult message="No news available." />;
  }
  return (
    <div className="news-list">
      {data.map((individualNews) => {
        return (
          <NewsCard
            {...individualNews}
            key={new Date(individualNews.publishedAt).getTime()}
          />
        );
      })}
    </div>
  );
};

const NewsListWithLoader = withLoader(NewsList);

export default NewsListWithLoader;
