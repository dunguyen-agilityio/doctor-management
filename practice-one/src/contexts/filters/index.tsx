import { useEffect, useState } from 'react';
import { createContext } from 'react';

import { EMPTY_FUNCTION } from '@/constants/funtion';

export const FiltersContext = createContext<string[]>([]);

export const FiltersActionContext =
  createContext<React.Dispatch<React.SetStateAction<string[]>>>(EMPTY_FUNCTION);

const FiltersProvider = ({
  children,
  initial,
}: React.PropsWithChildren<{ initial?: string }>) => {
  const [filters, setFilters] = useState<string[]>([]);

  const isEmpty = !filters.length;

  useEffect(() => {
    if (initial) {
      setFilters([initial]);
    }

    return () => {
      if (!isEmpty) setFilters([]);
    };
  }, [initial, isEmpty]);

  return (
    <FiltersActionContext.Provider value={setFilters}>
      <FiltersContext.Provider value={filters}>
        {children}
      </FiltersContext.Provider>
    </FiltersActionContext.Provider>
  );
};

export default FiltersProvider;
