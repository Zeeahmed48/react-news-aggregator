import { FC, ReactElement, useState } from 'react';

import { Select, Input } from '@/components';
import { CATEGORIES, SOURCES } from '@/constants';
import { useDebounce } from '@/hooks';

import './style.css';

type FiltersProps = {
  search: string;
  setSearch: (search: string) => void;
  selectedSource: string;
  setSelectedSource: (source: Source) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  shouldDebounce?: boolean;
};

const Filters: FC<FiltersProps> = ({
  search,
  setSearch,
  selectedSource,
  setSelectedSource,
  selectedCategory,
  setSelectedCategory,
  shouldDebounce = false
}): ReactElement => {
  const [localSearch, setLocalSearch] = useState<string>(search);

  const debouncedSearch = useDebounce(setSearch, 1500);

  return (
    <div className="filters-container">
      <div className="filter-input-container">
        <Input
          variant="white-bordered"
          placeholder="Search News"
          value={localSearch}
          onChange={(e) => {
            const text = e.target.value;
            setLocalSearch(text);

            if (shouldDebounce) {
              debouncedSearch(text);
            } else {
              setSearch(text);
            }
          }}
        />
      </div>
      <div className="dropdowns-container">
        <Select
          placeholder="Select Source"
          options={SOURCES}
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value as Source)}
        />
        <Select
          placeholder="Select Category"
          options={CATEGORIES}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;