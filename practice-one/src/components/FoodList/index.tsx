import { useCallback, useMemo } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@/navigation';

import { COLOR, ROUTES } from '@/constants';

import { IFood } from '@/types';

import FoodCard from '../FoodCard';

export interface FoodListProps extends Partial<FlatListProps<IFood>> {
  horizontal?: boolean;
  data?: IFood[] | null;
}

const FoodList = ({
  horizontal,
  data,
  ListHeaderComponent = null,
  ...otherProps
}: FoodListProps) => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handlePressItem = useCallback(
    (id: string) => {
      navigate(ROUTES.DETAIL, { id });
    },
    [navigate],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IFood; index: number }) => (
      <FoodCard
        calories={item.nutritional.calories}
        color={item.color}
        id={item.id}
        imgUrl={item.imgUrl}
        weight={item.weight}
        name={item.name}
        onPress={handlePressItem}
        marginLeft={horizontal && index === 0 ? 16 : 0}
      />
    ),
    [handlePressItem, horizontal],
  );

  const keyExtractor = useCallback((item: IFood) => item.id, []);

  const isEmpty = !data?.length;

  const contentContainerStyle = useMemo(
    () => [
      styles.listContainer,
      horizontal ? styles.horizontalList : styles.verticalList,
      isEmpty && styles.listEmpty,
    ],
    [horizontal, isEmpty],
  );

  return (
    <View style={styles.container} testID="food-list-container">
      {horizontal ? (ListHeaderComponent as React.ReactNode) : null}
      <FlatList
        {...otherProps}
        testID="food-list"
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...(!horizontal && {
          numColumns: 2,
          columnWrapperStyle: { gap: 18 },
        })}
        scrollEnabled={true}
        onStartReachedThreshold={0.5}
        ListHeaderComponent={horizontal ? null : ListHeaderComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    gap: 18,
    flex: 1,
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
  listEmpty: {
    flex: 1,
  },
});

export default FoodList;
