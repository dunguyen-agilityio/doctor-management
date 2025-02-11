import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

import { useFoods } from '@hooks';

import { Header, Search, Categories } from '@components';
import { FoodsList } from '@components/Foods';

const SearchScreen = () => {
  const { options, setOptions } = useFoods();

  const handleChangeTextSearch = useCallback(
    (text: string) => {
      setOptions((prev) => ({ ...prev, query: text }));
    },
    [setOptions]
  );

  const handleSelectTag = useCallback(
    (ids: number[]) => {
      if (ids) setOptions((prev) => ({ ...prev, categories: ids }));
    },
    [setOptions]
  );

  return (
    <View style={styles.container}>
      <Header />

      <Search value={options.query} onChangeText={handleChangeTextSearch} />

      <Categories onSelect={handleSelectTag} select={options.categories} />

      <FoodsList
        slots={{
          container: {
            alignItems: 'center',
          },
          list: {
            columnWrapperStyle: styles.itemStyle,
            numColumns: 2,
            style: { width: '100%' },
          },
        }}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 62,
    padding: 16,
  },
  list: {
    justifyContent: 'space-between',
    width: '100%',
  },
  itemStyle: {
    justifyContent: 'space-between',
  },
});
