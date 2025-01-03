import { FC, memo, ReactElement, useMemo } from 'react';

import { Container, EmptyResult, Filters, NewsList } from '@/components';
import { useFilters, useNews } from '@/hooks';

import './style.css';

const Search: FC = memo((): ReactElement => {
  const {
    search,
    date,
    selectedSource,
    selectedCategory,
    setSearch,
    setDate,
    setSelectedSource,
    setSelectedCategory,
    filters
  } = useFilters();

  const { areNewsLoading, allNews } = useNews(selectedSource, filters, {
    skip: !search
  });

  const shouldShowNews = useMemo(() => {
    return areNewsLoading || !!search || allNews.length > 0;
  }, [areNewsLoading, allNews, search]);

  return (
    <section className="search-page">
      <Container>
        <Filters
          search={search}
          date={date}
          selectedCategory={selectedCategory}
          selectedSource={selectedSource}
          setSearch={setSearch}
          setDate={setDate}
          setSelectedCategory={setSelectedCategory}
          setSelectedSource={setSelectedSource}
          shouldDebounce
        />
      </Container>
      <Container className="search-container">
        {shouldShowNews ? (
          <NewsList data={allNews} isLoading={areNewsLoading} />
        ) : (
          <EmptyResult message="Please search news to view results" />
        )}
      </Container>
    </section>
  );
});

export default Search;
