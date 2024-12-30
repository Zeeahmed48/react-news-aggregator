import { useMemo, useState } from 'react';

const useFilters = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<Source>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filters = useMemo(
    () => ({
      query: search,
      date: '2024-12-20'
      // category: selectedCategory
    }),
    [search]
  );

  return {
    search,
    selectedSource,
    selectedCategory,
    setSearch,
    setSelectedSource,
    setSelectedCategory,
    filters
  };
};

export default useFilters;
