import { useMemo, useState } from 'react';

const useFilters = () => {
  const [search, setSearch] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<Source>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filters = useMemo(
    () => ({
      query: search,
      date: date
      // category: selectedCategory
    }),
    [search, date]
  );

  return {
    search,
    date,
    selectedSource,
    selectedCategory,
    setSearch,
    setDate,
    setSelectedSource,
    setSelectedCategory,
    filters
  };
};

export default useFilters;
