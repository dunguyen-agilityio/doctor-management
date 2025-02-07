import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

import { useFoods } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProps } from '@navigation';
import { Empty, Header, Loading, Search, Categories } from '@components';
import { DETAIL, SEARCH } from '@constants';
import { FoodsList } from '@components/Foods';

const SearchScreen = () => {
  const { navigate, goBack } =
    useNavigation<RootScreenNavigationProps<typeof SEARCH>>();
  const { loading, data, setQuery, query, fetch } = useFoods();

  const handleChangeTextSearch = useCallback(
    (text: string) => {
      setQuery((prev) => ({ ...prev, name: text }));
    },
    [setQuery]
  );

  const handleSelectTag = useCallback(
    (ids: number[]) => {
      if (ids) setQuery((prev) => ({ ...prev, categories: ids }));
    },
    [setQuery]
  );

  const handlePressItem = useCallback(
    (id: number) => {
      navigate(DETAIL, { id, onChange: () => fetch(), onBack: () => goBack() });
    },
    [fetch, navigate, goBack]
  );

  return (
    <View style={styles.container}>
      <Header />

      <Search value={query?.name} onChangeText={handleChangeTextSearch} />

      <Categories onSelect={handleSelectTag} />

      {loading ? (
        <Loading marginTop={120} />
      ) : data === undefined || data.length === 0 ? (
        <Empty />
      ) : (
        <FoodsList
          foods={data}
          onPressItem={handlePressItem}
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
      )}
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
