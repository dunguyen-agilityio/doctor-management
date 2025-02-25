import { useFilters } from '@/hooks/useFilters';

const withFilters = <T,>(Component: (props: T) => React.ReactNode) => {
  const WithFiltersFood = (props: T) => {
    const { filters, setFilters } = useFilters();

    const toggleFilter = (id: string) => {
      const newFilters = filters.includes(id)
        ? filters.filter((category) => category !== id)
        : [...filters, id];

      setFilters(newFilters);
    };

    return (
      <Component {...props} onSelect={toggleFilter} categoriesValue={filters} />
    );
  };

  return WithFiltersFood;
};

export default withFilters;
