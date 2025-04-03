import { StyleSheet, View, ViewStyle } from 'react-native';

import { range } from '@/utils/array';

import FoodCardSkeleton from './FoodCard';

const VerticalFoodListSkeleton = ({
  length = 6,
  ...style
}: {
  length?: number;
} & ViewStyle) => {
  return (
    <View style={[styles.container, style]}>
      {range(length).map((idx) => (
        <FoodCardSkeleton key={idx} />
      ))}
    </View>
  );
};

export default VerticalFoodListSkeleton;

const styles = StyleSheet.create({
  container: {
    gap: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
