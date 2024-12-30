import { FC, memo, ReactElement } from 'react';

import { Container } from '@/components';

import './style.css';

const NewsFeed: FC = memo((): ReactElement => {
  return (
    <section className="news-feed-page">
      <Container className="news-feed-container"></Container>
    </section>
  );
});

export default NewsFeed;
