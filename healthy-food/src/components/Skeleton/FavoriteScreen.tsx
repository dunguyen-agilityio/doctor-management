import { StyleSheet, View } from 'react-native';

import { COLOR } from '@/theme';

import SearchInputSkeleton from './SearchInput';
import VerticalFoodListSkeleton from './VerticalFoodList';

const FavoriteScreenSkeleton = () => {
  return (
    <View style={styles.container}>
      <SearchInputSkeleton />
      <VerticalFoodListSkeleton />
    </View>
  );
};

export default FavoriteScreenSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 55,
    backgroundColor: COLOR.WHITE,
    gap: 22,
  },
});
