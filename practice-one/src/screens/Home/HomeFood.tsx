import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { FoodList, FoodListSkeleton } from '@/components';
import { FoodListProps } from '@/components/FoodList';

import { QUERY_KEYS } from '@/constants';

import { useFoodList } from '@/hooks/useFoodList';

const HomeFood = (props: FoodListProps) => {
  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useFoodList({
    queryKey: QUERY_KEYS.HOME_FOOD,
  });

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading)
    return (
      <View style={styles.fallback}>
        <FoodListSkeleton title="All Food" />
      </View>
    );

  return (
    <FoodList
      data={data}
      onEndReached={handleEndReached}
      ListFooterComponent={
        isFetchingNextPage ? <FoodListSkeleton length={1} /> : null
      }
      {...props}
    />
  );
};

export default HomeFood;

const styles = StyleSheet.create({
  fallback: {
    marginTop: 15,
  },
});
