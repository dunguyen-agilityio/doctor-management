import { useContext } from 'react';

import { SearchActionContext, SearchContext } from '@/contexts/search';

export const useSearchQuery = () => {
  const query = useContext(SearchContext);
  const setQuery = useContext(SearchActionContext);

  return { query, setQuery };
};
