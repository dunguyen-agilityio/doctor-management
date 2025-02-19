import { useCallback, useMemo } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@/navigation';

import { COLOR, ROUTES } from '@/constants';

import { IFood } from '@/types';

import Food from '../FoodCard';

export interface FoodsListProps extends Partial<FlatListProps<IFood>> {
  title?: React.ReactNode;
  horizontal?: boolean;
  foods: IFood[];
}

const FoodsList = ({
  title = null,
  horizontal,
  foods,
  ...otherProps
}: FoodsListProps) => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handlePressItem = useCallback(
    (id: string) => {
      navigate(ROUTES.DETAIL, { id });
    },
    [navigate],
  );

  const renderItem = useCallback(
    ({ item }: { item: IFood }) => (
      <Food
        calories={item.nutritional.calories}
        color={item.color}
        id={item.id}
        imgUrl={item.imgUrl}
        weight={item.weight}
        name={item.name}
        onPress={handlePressItem}
      />
    ),
    [handlePressItem],
  );

  const keyExtractor = useCallback((item: IFood) => item.id, []);

  const contentContainerStyle = useMemo(
    () => [
      styles.listContainer,
      horizontal ? styles.horizontalList : styles.verticalList,
    ],
    [horizontal],
  );

  return (
    <View style={styles.container} testID="foods-list-container">
      {title}
      <FlatList
        {...otherProps}
        testID="foods-list"
        data={foods}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...(!horizontal && { numColumns: 2, columnWrapperStyle: { gap: 18 } })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 18,
  },
  listContainer: {
    gap: 18,
  },
  verticalList: {
    alignItems: 'flex-start',
    width: 326,
    marginHorizontal: 'auto',
  },
  horizontalList: {
    marginHorizontal: 'auto',
  },
});

export default FoodsList;
