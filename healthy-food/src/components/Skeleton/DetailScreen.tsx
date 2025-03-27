import { StyleSheet, View } from 'react-native';

import { WINDOW_WIDTH } from '@/constants';

import { range } from '@/utils/array';

import Container from '../Container';
import Skeleton from './Skeleton';

const DetailSkeleton = () => {
  return (
    <Container alignItems="center" gap={12} paddingHorizontal={20}>
      <Skeleton width={160} height={160} shimmerStyle={{ borderRadius: 80 }} />
      <Skeleton width={120} height={52} />
      <Skeleton width={WINDOW_WIDTH} height={92} stopAutoRun />
      <View style={styles.session}>
        <Skeleton width={100} height={30} stopAutoRun />
        <View style={styles.description}>
          {range(4).map((idx) => (
            <Skeleton width={WINDOW_WIDTH - 40} key={idx} height={24} />
          ))}
          <Skeleton width={WINDOW_WIDTH / 2} height={24} />
        </View>
      </View>
      <Skeleton
        width={WINDOW_WIDTH - 60}
        height={50}
        stopAutoRun
        shimmerStyle={styles.favoriteButton}
      />
    </Container>
  );
};

export default DetailSkeleton;

const styles = StyleSheet.create({
  session: { gap: 20, paddingTop: 20 },
  description: {
    gap: 5,
  },
  favoriteButton: {
    marginTop: 30,
    borderRadius: 8,
  },
});
