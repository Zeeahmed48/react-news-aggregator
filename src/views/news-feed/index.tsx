import { FC, memo, ReactElement } from 'react';

import { Container, Preferences } from '@/components';
import { usePreferences } from '@/hooks';

import './style.css';

const NewsFeed: FC = memo((): ReactElement => {
  const { preferences, isLoaded, savePreferences } = usePreferences();

  return (
    <section className="news-feed-page">
      <Container className="news-feed-container">
        {!isLoaded || preferences !== null ? (
          <p>Prefered news feed..</p>
        ) : (
          <Preferences onSavePreferences={savePreferences} />
        )}
      </Container>
    </section>
  );
});

export default NewsFeed;
