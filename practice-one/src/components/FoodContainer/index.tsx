import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { FoodList } from '@/components';
import { FoodListProps } from '@/components/FoodList';

import { COLOR } from '@/constants';

import { useFoodList } from '@/hooks/useFoodList';

export interface FoodContainerProps {
  slotProps?: { list: Partial<FoodListProps> };
  Fallback?: React.ReactNode;
  categoriesValue?: string[];
  query?: string;
}

const FoodContainer = ({
  slotProps,
  Fallback = null,
  categoriesValue,
  query,
}: FoodContainerProps) => {
  const { isLoading, isFetchingNextPage, data, fetchNextPage } = useFoodList({
    categoriesValue,
    query,
  });

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const { ListFooterComponent = null, ...listProps } = slotProps?.list ?? {};

  if (isLoading) return Fallback;

  return (
    <View style={styles.container} testID="food-container">
      <View style={styles.list}>
        <FoodList
          {...listProps}
          data={data}
          onEndReached={handleEndReached}
          ListFooterComponent={isFetchingNextPage ? ListFooterComponent : null}
        />
      </View>
    </View>
  );
};

export default FoodContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  list: { paddingTop: 15, flex: 1 },
});
