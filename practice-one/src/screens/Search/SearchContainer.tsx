import { useContext } from 'react';

import { FoodsContainer, Loading, NotFound } from '@/components';
import { EmptyImage } from '@/components/icons';

import { FiltersContext } from '@/contexts/filters';
import { SearchContext } from '@/contexts/search';

const SearchContainer = () => {
  const query = useContext(SearchContext);
  const categories = useContext(FiltersContext);

  return (
    <FoodsContainer
      options={{ categories, query }}
      Fallback={<Loading />}
      slotProps={{
        list: {
          ListEmptyComponent: (
            <NotFound
              image={<EmptyImage />}
              description="Try searching with a different keyword or tweak your search a little."
              title="No Results Found"
            />
          ),
        },
      }}
    />
  );
};

export default SearchContainer;
