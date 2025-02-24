import { Categories } from '@/components';

import { CATEGORIES } from '@/constants';

import { useFilters } from '@/hooks/useFilters';

export const CategoriesWithContext = () => {
  const { filters, setFilters } = useFilters();

  const handleFilters = (id: string) => {
    const newFilters = filters.includes(id)
      ? filters.filter((category) => category !== id)
      : [...filters, id];

    setFilters(newFilters);
  };

  return (
    <Categories
      categories={CATEGORIES}
      onSelect={handleFilters}
      values={filters}
    />
  );
};
