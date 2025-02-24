import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { FoodList } from '@/components';
import { FoodListProps } from '@/components/FoodList';

import { COLOR } from '@/constants';

import { FoodOptions } from '@/services/food';

import { useFoodList } from '@/hooks/useFoodList';

interface FoodContainerProps {
  slotProps?: { list: Partial<FoodListProps> };
  Fallback?: React.ReactNode;
  options?: FoodOptions;
}

const FoodContainer = ({
  slotProps,
  Fallback = null,
  options,
}: FoodContainerProps) => {
  const { isLoading, data, fetchNextPage } = useFoodList(options);

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <View style={styles.container} testID="food-container">
      <View style={styles.list}>
        {isLoading && Fallback}
        {data && (
          <FoodList
            {...slotProps?.list}
            data={data}
            onEndReached={handleEndReached}
          />
        )}
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
