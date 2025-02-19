import { useContext } from 'react';

import { FiltersActionContext, FiltersContext } from '@/contexts/filters';

export const useFilters = () => {
  const filters = useContext(FiltersContext);
  const setFilters = useContext(FiltersActionContext);

  return { filters, setFilters };
};
