import { FC, memo, ReactElement } from 'react';

import { Container, NewsList, Preferences } from '@/components';
import { useAuthors, usePreferedNews, usePreferences } from '@/hooks';
import { CATEGORIES, SOURCES } from '@/constants';

import './style.css';

const NewsFeed: FC = memo((): ReactElement => {
  const { preferences, isLoaded, savePreferences } = usePreferences();
  const { authors, isLoading } = useAuthors({
    skip: !isLoaded || preferences !== null
  });
  const { isLoading: areNewsLoading, preferedNews } =
    usePreferedNews(preferences);

  return (
    <section className="news-feed-page">
      <Container className="news-feed-container">
        {!isLoaded || preferences !== null ? (
          <NewsList data={preferedNews} isLoading={areNewsLoading} />
        ) : (
          <Preferences
            onSavePreferences={savePreferences}
            authors={authors}
            sources={SOURCES}
            categories={CATEGORIES}
            isLoading={isLoading}
          />
        )}
      </Container>
    </section>
  );
});

export default NewsFeed;
