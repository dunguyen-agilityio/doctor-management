import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';

import { useFoods } from '@hooks';
import { Search } from '@components';
import { COLORS } from '@constants';
import { FoodsList } from '@components/Foods';

const FavoriteScreen = () => {
  const { setOptions } = useFoods();

  const handleChangeTextSearch = useCallback(
    (text: string) => {
      setOptions((prev) => ({ ...prev, name: text }));
    },
    [setOptions]
  );

  return (
    <View style={styles.container}>
      <Search value={''} onChangeText={handleChangeTextSearch} />
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
