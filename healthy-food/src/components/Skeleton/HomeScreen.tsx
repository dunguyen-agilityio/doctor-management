import { StyleSheet, View } from 'react-native';

import { range } from '@/utils/array';

import { COLOR } from '@/theme';

import FilterSkeleton from './Filter';
import HorizontalFoodListSkeleton from './HorizontalFoodList';
import SearchInputSkeleton from './SearchInput';
import Skeleton from './Skeleton';

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <SearchInputSkeleton />
      <FilterSkeleton />
      <View style={styles.slider}>
        {range(2).map((idx) => (
          <Skeleton key={idx} width={320} height={170} />
        ))}
      </View>
      <View style={styles.sliderDots}>
        <Skeleton width={20} height={10} />
        {range(2).map((idx) => (
          <Skeleton key={idx} width={12} height={8} />
        ))}
      </View>
      <View style={styles.foodList}>
        <Skeleton width={89} height={27} />
        <HorizontalFoodListSkeleton />
      </View>
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 14,
    gap: 20,
    backgroundColor: COLOR.WHITE,
  },
  slider: {
    flexDirection: 'row',
    gap: 16,
  },
  sliderDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  foodList: {
    gap: 16,
  },
});
