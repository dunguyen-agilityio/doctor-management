import { StyleSheet, View } from 'react-native';

import { COLOR } from '@/constants';

import Skeleton from './Skeleton';

const FoodCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton width={60} height={60} shimmerStyle={styles.imageSkeleton} />
      <Skeleton width={100} height={14} shimmerStyle={styles.textSkeleton} />
      <Skeleton height={14} width={100} style={styles.textSkeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 27,
    paddingVertical: 17,
    borderColor: COLOR.LIGHT_GREY,
    borderWidth: 1,
    height: 192,
    minWidth: 154,
  },
  imageSkeleton: {
    width: 60,
    height: 60,
    backgroundColor: COLOR.GREY,
  },
  textSkeleton: {
    backgroundColor: COLOR.GREY,
  },
});

export default FoodCardSkeleton;
