import { StyleSheet } from 'react-native';

import Skeleton from './Skeleton';

const SearchInputSkeleton = () => {
  return <Skeleton height={46} shimmerStyle={styles.container} />;
};

export default SearchInputSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
