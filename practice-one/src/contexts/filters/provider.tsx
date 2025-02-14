import React, { type PropsWithChildren, useState } from 'react';
import { createContext } from 'react';

export const FiltersContext = createContext<string[]>([]);

export const FiltersActionContext = createContext<
  React.Dispatch<React.SetStateAction<string[]>>
>(() => {});

const FiltersProvider = ({ children }: PropsWithChildren) => {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <FiltersContext.Provider value={filters}>
      <FiltersActionContext.Provider value={setFilters}>
        {children}
      </FiltersActionContext.Provider>
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
