import { createContext, useCallback, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

export const SearchContext = createContext('');

export const SearchActionContext = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});

export const SearchProvider = ({
  children,
  defaultValue = '',
}: React.PropsWithChildren<{
  defaultValue?: string;
}>) => {
  const [query, setQuery] = useState(defaultValue);

  useFocusEffect(
    useCallback(() => {
      setQuery(defaultValue);

      return () => {
        setQuery('');
      };
    }, [defaultValue]),
  );

  return (
    <SearchContext.Provider value={query}>
      <SearchActionContext.Provider value={setQuery}>
        {children}
      </SearchActionContext.Provider>
    </SearchContext.Provider>
  );
};
