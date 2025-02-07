import React, { useCallback, useEffect } from 'react';
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
import { COLORS, DETAIL, HOME } from '@constants';

import Loading from '@components/Loading';
import { Text } from '@components/common';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProps } from '@navigation';
import NotFound from '@components/NotFound';
import { useFoods } from '@hooks';

export interface FoodsProps {
  title?: React.ReactNode;
  onPressItem?: (id: number) => void;
  slots?: { container?: ViewStyle; list?: Partial<FlatListProps<IFood>> };
}

const FoodsList = ({ slots, title = null }: FoodsProps) => {
  const { navigate } = useNavigation<RootScreenNavigationProps<typeof HOME>>();
  const { data: foods, isError, isLoading } = useFoods();

  const handlePressItem = (id: number) => {
    navigate(DETAIL, { id });
  };

  const handleItemSeparatorComponent = useCallback(
    () => <View style={{ marginLeft: 18, height: 18 }} />,
    []
  );

  const handleRenderItem = ({ item }: { item: IFood }) => (
    <Food data={item} onPress={handlePressItem} />
  );

  const handleKeyExtractor = useCallback((item: IFood) => item.id + '', []);

  const { list, container } = slots || {};

  if (isLoading) return <Loading />;

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!foods?.length) {
    return (
      <View style={styles.container}>
        <NotFound marginTop={200} />
      </View>
    );
  }

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
