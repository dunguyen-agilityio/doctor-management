import { useCallback } from 'react';
import { FlatList, FlatListProps, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@navigation';

import { COLORS, ROUTES } from '@constants';

import { IFood } from '@types';

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
    ({ item }: { item: IFood }) => {
      return <Food data={item} onPress={handlePressItem} />;
    },
    [handlePressItem],
  );

  const keyExtractor = useCallback((item: IFood) => item.id, []);

  return (
    <View style={styles.container}>
      {title}
      <FlatList
        {...otherProps}
        data={foods}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContainer,
          horizontal ? styles.horizontalList : styles.verticalList,
        ]}
        {...(!horizontal && {
          columnWrapperStyle: [styles.listContainer],
          numColumns: 2,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listContainer: {
    gap: 18,
    minWidth: 326,
  },
  verticalList: { alignItems: 'center' },
  horizontalList: {
    marginHorizontal: 'auto',
  },
});

export default FoodsList;
