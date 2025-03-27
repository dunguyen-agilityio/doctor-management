import {
  ShimmerPlaceholderProps,
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';

import { StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Skeleton = ({ shimmerStyle, ...props }: ShimmerPlaceholderProps) => {
  return (
    <ShimmerPlaceholder
      shimmerStyle={[styles.container, shimmerStyle]}
      shimmerColors={['#F4F4F4', '#E0E0E0', '#F4F4F4']}
      duration={1000}
      stopAutoRun={false}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
});

export default Skeleton;
