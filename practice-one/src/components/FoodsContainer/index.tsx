import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { FoodsList } from '@/components';
import { FoodsListProps } from '@/components/FoodsList';

import { COLOR } from '@/constants';

import { FoodOptions } from '@/services/food';

import { useFoods } from '@/hooks/useFood';

interface FoodsContainerProps {
  slotProps?: { list: Partial<FoodsListProps> };
  Fallback?: React.ReactNode;
  options?: FoodOptions;
}

const FoodsContainer = ({
  slotProps,
  Fallback = null,
  options,
}: FoodsContainerProps) => {
  const { isLoading, data, fetchNextPage } = useFoods(options);

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <View style={styles.container} testID="foods-container">
      <View style={styles.list}>
        {isLoading && Fallback}
        {data && (
          <FoodsList
            {...slotProps?.list}
            foods={data}
            onEndReached={handleEndReached}
          />
        )}
      </View>
    </View>
  );
};

export default FoodsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  list: { paddingTop: 15, flex: 1 },
});
