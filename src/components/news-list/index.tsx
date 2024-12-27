import { FC, ReactElement } from 'react';

import { NewsCard } from '@/components';
import { withLoader } from '@/hocs';

import './style.css';

const NewsList: FC<{ data: News[] }> = ({ data }): ReactElement => {
  return (
    <div className="news-list">
      {data.map((individualNews) => {
        return (
          <NewsCard {...individualNews} key={individualNews.publishedAt} />
        );
      })}
    </div>
  );
};

const NewsListWithLoader = withLoader(NewsList);

export default NewsListWithLoader;
