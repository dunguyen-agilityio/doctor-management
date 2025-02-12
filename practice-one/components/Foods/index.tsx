import { useCallback } from 'react';
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@navigation';

import { COLORS, ROUTES } from '@constants';

import { IFood } from '@types';

import { FoodState, useFoodsStore } from '@stores/food';

import Food from './Food';

export interface FoodsProps {
  title?: React.ReactNode;
  horizontal?: boolean;
  foods?: IFood[];
  emptyContent?: React.ReactNode;
  onPressItem?: (id: number) => void;
  idsSelector: (state: FoodState) => number[];
  style?: ViewStyle;
}

const FoodsList = ({
  title = null,
  emptyContent = null,
  horizontal,
  idsSelector,
  ...rest
}: FoodsProps) => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();
  const ids = useFoodsStore(idsSelector);
  const byId = useFoodsStore(({ byId }) => byId);

  const handlePressItem = useCallback(
    (id: number) => {
      navigate(ROUTES.DETAIL, { id });
    },
    [navigate],
  );

  const handleRenderItem = useCallback(
    ({ item }: { item: number }) => {
      return <Food data={byId[item]} onPress={handlePressItem} />;
    },
    [byId, handlePressItem],
  );

  const handleKeyExtractor = useCallback((item: number) => String(item), []);

  if (!ids?.length) {
    return <View style={styles.notFound}>{emptyContent}</View>;
  }

  const isEven = ids.length % 2 == 0;

  return (
    <View style={styles.container}>
      {title}
      <FlatList
        data={ids}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={horizontal}
        contentContainerStyle={[
          styles.itemSeparator,
          isEven && { alignItems: 'center' },
        ]}
        scrollEnabled={!!horizontal}
        {...(!horizontal && verticalStyles)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notFound: { flex: 1 },
  itemSeparator: {
    gap: 18,
  },
});

const verticalStyles: Partial<FlatListProps<number>> = {
  columnWrapperStyle: styles.itemSeparator,
  numColumns: 2,
};

export default FoodsList;
