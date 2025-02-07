import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { useFoods } from '@hooks';
import { NotFound, Search } from '@components';
import { RootScreenNavigationProps } from '@navigation';
import { COLORS, DETAIL, FAVORITE } from '@constants';
import { FoodsList } from '@components/Foods';

const FavoriteScreen = () => {
  const { navigate, goBack } =
    useNavigation<RootScreenNavigationProps<typeof FAVORITE>>();

  const { data, fetch, setQuery, query } = useFoods();

  const handleChangeTextSearch = useCallback(
    (text: string) => {
      setQuery((prev) => ({ ...prev, name: text }));
    },
    [setQuery]
  );

  const handlePressItem = useCallback(
    (id: number) => {
      navigate(DETAIL, {
        id,
        onChange: () => fetch(),
        onBack: () => goBack(),
      });
    },
    [fetch, navigate, goBack]
  );

  const isEmpty = data === undefined || data.length === 0;

  return (
    <View style={styles.container}>
      <Search value={query?.name} onChangeText={handleChangeTextSearch} />
      {isEmpty ? (
        <View style={styles.container}>
          <NotFound marginTop={200} />
        </View>
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

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: 62,
    paddingHorizontal: 16,
  },
  itemStyle: {
    justifyContent: 'space-between',
  },
});
