import { StyleSheet, View } from 'react-native';

import { range } from '@/utils/array';

import Skeleton from './Skeleton';

const FiltersSkeleton = () => {
  return (
    <View style={styles.container}>
      {range(8).map((idx) => (
        <Skeleton width={80} key={idx} height={26} />
      ))}
    </View>
  );
};

export default FiltersSkeleton;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flexDirection: 'row',
  },
});
