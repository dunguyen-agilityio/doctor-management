import { createContext, useCallback, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { isArrayEqual } from '@/utils/enum';

export const FiltersContext = createContext<string[]>([]);

export const FiltersActionContext = createContext<
  React.Dispatch<React.SetStateAction<string[]>>
>(() => {});

export const FiltersProvider = ({
  children,
  defaultValue = [],
}: React.PropsWithChildren<{ defaultValue?: string[] }>) => {
  const [filters, setFilters] = useState(defaultValue);

  useFocusEffect(
    useCallback(() => {
      setFilters((prev) =>
        isArrayEqual(prev, defaultValue) ? prev : defaultValue,
      );
    }, [defaultValue]),
  );

  return (
    <FiltersContext.Provider value={filters}>
      <FiltersActionContext.Provider value={setFilters}>
        {children}
      </FiltersActionContext.Provider>
    </FiltersContext.Provider>
  );
};
