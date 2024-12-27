import { FC, ReactElement } from 'react';

import { Container, NewsList } from '@/components';
import { useNews } from '@/hooks';

import './style.css';

const NewsFeed: FC = (): ReactElement => {
  const { areNewsLoading, allNews } = useNews();

  return (
    <section className="news-feed-page">
      <Container className="news-feed-container">
        <NewsList data={allNews} isLoading={areNewsLoading} />
      </Container>
    </section>
  );
};

export default NewsFeed;
