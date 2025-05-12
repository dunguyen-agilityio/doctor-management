import { StyleSheet, View } from 'react-native';

import { COLOR } from '@/theme';

import FilterSkeleton from './Filter';
import SearchInputSkeleton from './SearchInput';
import VerticalFoodListSkeleton from './VerticalFoodList';

const SearchScreenSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchInputSkeleton />
        <FilterSkeleton />
      </View>
      <VerticalFoodListSkeleton paddingTop={25} />
    </View>
  );
};

export default SearchScreenSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 14,
    backgroundColor: COLOR.WHITE,
  },
  header: {
    gap: 16,
  },
});
