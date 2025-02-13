import { useCallback, useContext } from 'react';
import { FlatList, StyleSheet, View, ViewStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FoodsContext } from '@contexts/foods';

import { RootScreenNavigationProps } from '@navigation';

import { COLORS, ROUTES } from '@constants';

import { IFood } from '@types';

import Food from '../FoodCard';

export interface FoodsProps {
  title?: React.ReactNode;
  horizontal?: boolean;
  emptyContent?: React.ReactNode;
  style?: ViewStyle;
}

const FoodsList = ({
  title = null,
  emptyContent = null,
  horizontal,
  ...rest
}: FoodsProps) => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();
  const { byId, ids } = useContext(FoodsContext);

  const handlePressItem = useCallback(
    (id: string) => {
      navigate(ROUTES.DETAIL, { id });
    },
    [navigate],
  );

  const handleRenderItem = useCallback(
    ({ item }: { item: string }) => {
      return <Food data={byId[item]} onPress={handlePressItem} />;
    },
    [handlePressItem, byId],
  );

  const handleKeyExtractor = useCallback((item: string) => item, []);

  return (
    <View style={styles.container}>
      {title}
      {ids.length ? (
        <FlatList
          data={ids}
          keyExtractor={handleKeyExtractor}
          renderItem={handleRenderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={horizontal}
          contentContainerStyle={[
            styles.itemSeparator,
            {
              alignItems: 'flex-start',
              marginHorizontal: 'auto',
              minWidth: 326,
            },
          ]}
          {...(!horizontal && {
            columnWrapperStyle: styles.itemSeparator,
            numColumns: 2,
          })}
          {...rest}
        />
      ) : (
        emptyContent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemSeparator: {
    gap: 18,
  },
});

export default FoodsList;
