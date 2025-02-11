import React, { memo } from 'react';
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { IFood } from '@types';
import Food from './Food';
import { COLORS, DETAIL, HOME } from '@constants';

import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProps } from '@navigation';
import NotFound from '@components/NotFound';
import { FoodState, useFoodsStore } from '@stores/food';

export interface FoodsProps {
  title?: React.ReactNode;
  onPressItem?: (id: number) => void;
  slots?: {
    container?: ViewStyle;
    list?: Partial<FlatListProps<number>>;
    item?: StyleProp<ViewStyle>;
  };
  foods?: IFood[];
  getIds: (state: FoodState) => number[];
}

const FoodsList = ({ slots, title = null, getIds }: FoodsProps) => {
  const { navigate } = useNavigation<RootScreenNavigationProps<typeof HOME>>();
  const ids = useFoodsStore(getIds);
  const byId = useFoodsStore(({ byId }) => byId);

  const handlePressItem = (id: number) => {
    navigate(DETAIL, { id });
  };

  const handleItemSeparatorComponent = () => (
    <View style={styles.itemSeparator} />
  );
  const { list, container, item: itemStyle } = slots || {};

  const handleRenderItem = ({ item }: { item: number }) => (
    <Food
      data={byId[item]}
      onPress={handlePressItem}
      style={[styles.item, itemStyle]}
    />
  );

  const handleKeyExtractor = (item: number) => item + '';

  if (!getIds?.length) {
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
        data={ids}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={handleItemSeparatorComponent}
        contentContainerStyle={{
          paddingHorizontal: 5,
        }}
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
  },
  list: {
    marginTop: 15,
  },
  item: { justifyContent: 'space-between' },
  itemSeparator: { marginLeft: 18, height: 18 },
});

export default memo(FoodsList);
