import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import FoodsProvider from '@contexts/foods/provider';
import { SearchProvider } from '@contexts/search';

import { FoodsList, NotFound, SearchInput } from '@components';

import FavoriteContainer from './container';

const FavoriteScreen = () => {
  useFocusEffect(useCallback(() => {}, []));

  return (
    <FoodsProvider>
      <SearchProvider>
        <FavoriteContainer>
          <SearchInput />
          <FoodsList emptyContent={<NotFound />} style={styles.list} />
        </FavoriteContainer>
      </SearchProvider>
    </FoodsProvider>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  list: {
    marginTop: 24,
    width: '100%',
  },
});
