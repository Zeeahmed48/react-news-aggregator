import { FC, memo, ReactElement, useMemo } from 'react';

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

  const authorsList = useMemo(
    () =>
      authors.map((author) => ({
        label: author,
        value: author
      })),
    [authors]
  );

  return (
    <section className="news-feed-page">
      <Container className="news-feed-container">
        {!isLoaded || preferences !== null ? (
          <NewsList data={preferedNews} isLoading={areNewsLoading} />
        ) : (
          <Preferences
            onSavePreferences={savePreferences}
            authors={authorsList}
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
