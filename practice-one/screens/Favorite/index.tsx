import { StyleSheet } from 'react-native';
import React from 'react';

import { FoodsList, SearchInput } from '@components';
import { COLORS } from '@constants';

import FoodsContainer from '@components/FoodsContainer';

const FavoriteScreen = () => {
  return (
    <FoodsContainer style={styles.container} favorite={1}>
      <SearchInput />
      <FoodsList
        getIds={({ favoriteIds }) => favoriteIds}
        slots={{
          container: {
            alignItems: 'center',
          },
          list: {
            columnWrapperStyle: styles.item,
            numColumns: 2,
            style: { width: '100%' },
          },
          item: { marginHorizontal: 18 },
        }}
      />
    </FoodsContainer>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 62,
  },
  item: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
