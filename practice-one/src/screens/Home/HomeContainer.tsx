import { StyleSheet, View } from 'react-native';

import ErrorFallback from '@/components/ErrorFallback';
import FoodCardSkeleton from '@/components/FoodCardSkeleton';

import { useFoods } from '@/hooks';

const HomeContainer = ({
  children,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { error, isLoading } = useFoods({
    queryKey: 'foods',
  });

  if (error) return <ErrorFallback error={error} />;

  if (isLoading) {
    return (
      <View style={styles.container} testID="food-skeleton">
        <View style={styles.textSkeleton} />
        <View style={styles.list}>
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <FoodCardSkeleton key={idx} />
            ))}
        </View>
      </View>
    );
  }

  return children;
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  list: {
    flexDirection: 'row',
    gap: 20,
  },
  textSkeleton: {
    width: 80,
    height: 16,
    marginTop: 10,
    backgroundColor: '#E0E0E0',
  },
});
