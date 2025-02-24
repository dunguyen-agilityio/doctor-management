import { useState } from 'react';
import { createContext } from 'react';

import { EMPTY_FUNCTION } from '@/constants/funtion';

export const SearchContext = createContext('');

export const SearchActionContext =
  createContext<React.Dispatch<React.SetStateAction<string>>>(EMPTY_FUNCTION);

const SearchProvider = ({ children }: React.PropsWithChildren) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={query}>
      <SearchActionContext.Provider value={setQuery}>
        {children}
      </SearchActionContext.Provider>
    </SearchContext.Provider>
  );
};

export default SearchProvider;
