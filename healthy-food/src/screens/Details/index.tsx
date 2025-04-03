import { StyleSheet } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import {
  Button,
  Container,
  DetailScreenSkeleton,
  ErrorFallback,
  FoodInfo,
} from '@/components';

import { QUERY_KEYS } from '@/constants';

import type { StackScreenProps } from '@/types';

import { getFoodById } from '@/services/food';

import { useFavorite } from '@/hooks';

import { ROUTES } from '@/routes';

const Details = ({ route: { params } }: StackScreenProps<ROUTES.DETAIL>) => {
  const { id } = params;

  const {
    isLoading,
    error,
    data: food,
  } = useQuery({
    queryKey: [QUERY_KEYS.FOOD_BY_ID(id)],
    queryFn: () => getFoodById(id),
    staleTime: 1000 * 60 * 5,
  });

  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();

  const hasFavorite = favorites.some(({ id: foodId }) => foodId === id);

  const toggleFavorite = () => {
    hasFavorite ? removeFromFavorite(id) : addToFavorite(food!);
  };

  if (isLoading) {
    return <DetailScreenSkeleton />;
  }

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <Container flex={1} paddingHorizontal={20}>
      {food ? (
        <>
          <FoodInfo {...food} />
          <Button onPress={toggleFavorite} style={styles.button}>
            {hasFavorite ? 'Unfavorite' : 'Add to Favorites'}
          </Button>
        </>
      ) : null}
    </Container>
  );
};

export default Details;

const styles = StyleSheet.create({
  button: {
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
