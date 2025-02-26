import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const FiltersContext = createContext<string[]>([]);

export const FiltersActionContext = createContext<
  React.Dispatch<React.SetStateAction<string[]>>
>(() => {});

const FiltersProvider = ({
  children,
  initial,
}: React.PropsWithChildren<{ initial?: string }>) => {
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    if (initial) {
      setFilters([initial]);
    }
  }, [initial]);

  return (
    <FiltersActionContext.Provider value={setFilters}>
      <FiltersContext.Provider value={filters}>
        {children}
      </FiltersContext.Provider>
    </FiltersActionContext.Provider>
  );
};

export default FiltersProvider;
