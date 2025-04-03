import { FlatList, FlatListProps, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { VERTICAL_PAGE_SIZE } from '@/constants';

import type { IFood, StackParamsList } from '@/types';

import { ROUTES } from '@/routes';

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
    useNavigation<NativeStackNavigationProp<StackParamsList, ROUTES.ROOT>>();

  const renderItem = ({ item, index }: { item: IFood; index: number }) => {
    const { id, name, imgUrl, weight, color, nutritional } = item;
    return (
      <FoodCard
        calories={nutritional.calories}
        color={color}
        id={id}
        imgUrl={imgUrl}
        weight={weight}
        name={name}
        onPress={() => {
          navigate(ROUTES.DETAIL, { id });
        }}
        marginLeft={horizontal && index === 0 ? 16 : 0}
      />
    );
  };

  const keyExtractor = (item: IFood) => item.id;

  const isEmpty = !data?.length;

  return (
    <FlatList
      testID="food-list"
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        horizontal ? styles.horizontalList : styles.verticalList,
        isEmpty && styles.listEmpty,
      ]}
      numColumns={horizontal ? undefined : 2}
      columnWrapperStyle={horizontal ? null : styles.columnWrapperStyle}
      scrollEnabled
      onStartReachedThreshold={0.5}
      initialNumToRender={VERTICAL_PAGE_SIZE}
      maxToRenderPerBatch={VERTICAL_PAGE_SIZE / 2}
      windowSize={5}
      ListHeaderComponent={horizontal ? null : ListHeaderComponent}
      removeClippedSubviews
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {
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
  columnWrapperStyle: {
    gap: 18,
  },
});

export default FoodList;
