import { StyleSheet } from 'react-native';
import React from 'react';

import { Header, SearchInput, FoodsList } from '@components';
import { COLORS } from '@constants';
import FoodCategories from '@components/FoodCategories';
import FoodsContainer from '@components/FoodsContainer';

const SearchScreen = () => {
  return (
    <FoodsContainer style={styles.container}>
      <Header />
      <SearchInput />
      <FoodCategories />
      <FoodsList
        getIds={({ allIds }) => allIds}
        slots={{
          container: {
            alignItems: 'center',
          },
          list: {
            columnWrapperStyle: styles.item,
            numColumns: 2,
            style: { width: '100%' },
          },
          item: {
            marginHorizontal: 18,
          },
        }}
      />
    </FoodsContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 62,
  },
  list: {
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
