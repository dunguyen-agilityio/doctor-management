import { useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';

import {
  FoodCategories,
  FoodsContainer,
  FoodsList,
  Header,
  NotFound,
  SearchInput,
} from '@components';

import { EmptyImage } from '@constants';

import { idsSelector, querySelector, useFilterStore } from '@stores';

const SearchScreen = () => {
  const setFilter = useFilterStore(({ setFilter }) => setFilter);
  const searchInputRef = useRef<TextInput>(null);

  useFocusEffect(() => {
    console.log('focus');
    searchInputRef.current?.focus();

    return () => {
      setFilter({ query: '', categories: [] });
    };
  });

  const handleSearch = (query: string) => {
    setFilter({ query });
  };

  return (
    <FoodsContainer style={styles.container} getQuery={({ query }) => query}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SearchInput
          onChangeQuery={handleSearch}
          getQuery={querySelector}
          ref={searchInputRef}
        />
        <FoodCategories />
        <FoodsList
          style={styles.list}
          idsSelector={idsSelector}
          emptyContent={
            <NotFound
              image={<EmptyImage />}
              description={`Try search for a different keyword or\n tweak your search a little`}
              title="No Results Found"
            />
          }
        />
        <Header />
      </ScrollView>
    </FoodsContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 62,
  },
  list: {
    marginTop: 24,
    width: '100%',
  },
});
