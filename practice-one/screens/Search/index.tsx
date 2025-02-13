import { useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import FiltersProvider from '@contexts/filters/provider';
import FoodsProvider from '@contexts/foods/provider';
import SearchProvider from '@contexts/search/provider';

import {
  FoodCategories,
  FoodsList,
  Header,
  NotFound,
  SearchInput,
} from '@components';

import { EmptyImage } from '@constants';

import SearchContainer from './container';

const SearchScreen = () => {
  const searchInputRef = useRef<TextInput>(null);

  return (
    <FoodsProvider>
      <SearchProvider>
        <FiltersProvider>
          <SearchContainer>
            <Header />
            <SearchInput ref={searchInputRef} />
            <FoodCategories />
            <FoodsList
              style={styles.list}
              emptyContent={
                <NotFound
                  image={<EmptyImage />}
                  description={`Try search for a different keyword or\n tweak your search a little`}
                  title="No Results Found"
                />
              }
            />
          </SearchContainer>
        </FiltersProvider>
      </SearchProvider>
    </FoodsProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  list: {
    marginTop: 24,
    width: '100%',
  },
});
