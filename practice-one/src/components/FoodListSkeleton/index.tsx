import { StyleSheet, View } from 'react-native';

import { COLOR } from '@/constants';

import FoodCardSkeleton from '../FoodCardSkeleton';
import Text from '../Text';

const FoodListSkeleton = ({
  length = 4,
  title,
}: {
  length?: number;
  title?: string;
}) => {
  const items = Array(length).fill(0);

  return (
    <View style={styles.container} testID="food-skeleton">
      {title && (
        <View style={styles.title}>
          <Text color={COLOR.GREY}>{title}</Text>
        </View>
      )}
      <View style={styles.list}>
        {items.map((_, idx) => (
          <FoodCardSkeleton key={idx} />
        ))}
      </View>
    </View>
  );
};

export default FoodListSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    gap: 10,
    paddingLeft: 16,
  },
  list: { marginTop: 15, flexDirection: 'row', gap: 16 },
  title: {
    width: 80,
    height: 20,
    marginTop: 10,
    backgroundColor: COLOR.GREY,
    borderRadius: 10,
  },
});
