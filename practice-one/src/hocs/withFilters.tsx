import { useCallback } from 'react';

import { useFilters } from '@/hooks/useFilters';

const withFilters = <T,>(Component: (props: T) => React.ReactNode) => {
  const WithFilters = (props: T) => {
    const { filters, setFilters } = useFilters();

    const toggleFilter = useCallback(
      (id: string) => {
        setFilters((prev) => {
          const newFilters = prev.includes(id)
            ? prev.filter((category) => category !== id)
            : [...prev, id];

          return newFilters;
        });
      },
      [setFilters],
    );

    return (
      <Component {...props} onSelect={toggleFilter} categoriesValue={filters} />
    );
  };

  return WithFilters;
};

export default withFilters;
