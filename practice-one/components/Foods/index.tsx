import React, { useCallback } from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { IFood } from '@types';
import Food from './Food';
import FoodImage from './FoodImage';
import { COLORS } from '@constants';

export interface FoodsProps {
  title?: React.ReactNode;
  foods: IFood[] | null;
  onPressItem?: (id: number) => void;
  slots?: { container?: ViewStyle; list?: Partial<FlatListProps<IFood>> };
}

const FoodsList = ({ foods, slots, title = null, onPressItem }: FoodsProps) => {
  const handleItemSeparatorComponent = useCallback(
    () => <View style={{ marginLeft: 18, height: 18 }} />,
    []
  );

  const handleRenderItem = useCallback(
    ({ item }: { item: IFood }) => <Food data={item} onPress={onPressItem} />,
    [onPressItem]
  );

  const handleKeyExtractor = useCallback((item: IFood) => item.id + '', []);

  const { list, container } = slots || {};

  return (
    <View style={[styles.container, container]}>
      {title}
      <FlatList
        data={foods}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={handleItemSeparatorComponent}
        {...list}
        style={[styles.list, list?.style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 15,
  },
  vertical: {},
  itemStyle: {},
});

export { FoodsList, FoodImage };
