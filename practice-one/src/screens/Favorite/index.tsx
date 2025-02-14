import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import FoodsProvider from '@/contexts/foods/provider';
import { SearchProvider } from '@/contexts/search';

import { FoodsContainer, NotFound } from '@/components';

import { COLORS } from '@/constants';

import FavoriteContainer from './container';

const FavoriteScreen = () => {
  useFocusEffect(useCallback(() => {}, []));

  return (
    <SearchProvider>
      <FoodsProvider>
        <View style={styles.container}>
          <FavoriteContainer>
            <FoodsContainer
              slotProps={{
                list: {
                  ListEmptyComponent: <NotFound />,
                },
              }}
            />
          </FavoriteContainer>
        </View>
      </FoodsProvider>
    </SearchProvider>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 62,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  list: {
    marginTop: 24,
    width: '100%',
  },
});
