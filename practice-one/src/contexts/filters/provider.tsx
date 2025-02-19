import { createContext, useState } from 'react';

export const FiltersContext = createContext<string[]>([]);

export const FiltersActionContext = createContext<
  React.Dispatch<React.SetStateAction<string[]>>
>(() => {});

export const FiltersProvider = ({ children }: React.PropsWithChildren) => {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <FiltersContext.Provider value={filters}>
      <FiltersActionContext.Provider value={setFilters}>
        {children}
      </FiltersActionContext.Provider>
    </FiltersContext.Provider>
  );
};
