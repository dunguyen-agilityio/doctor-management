import { createContext, useState } from 'react';

export const SearchContext = createContext('');

export const SearchActionContext = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});

export const SearchProvider = ({ children }: React.PropsWithChildren) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={query}>
      <SearchActionContext.Provider value={setQuery}>
        {children}
      </SearchActionContext.Provider>
    </SearchContext.Provider>
  );
};
