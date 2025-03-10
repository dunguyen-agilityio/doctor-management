import { useState } from 'react';
import { createContext } from 'react';

export const FiltersContext = createContext<string[]>([]);

export const FiltersActionContext = createContext<
  React.Dispatch<React.SetStateAction<string[]>>
>(() => {});

const FiltersProvider = ({ children }: React.PropsWithChildren) => {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <FiltersActionContext.Provider value={setFilters}>
      <FiltersContext.Provider value={filters}>
        {children}
      </FiltersContext.Provider>
    </FiltersActionContext.Provider>
  );
};

export default FiltersProvider;
