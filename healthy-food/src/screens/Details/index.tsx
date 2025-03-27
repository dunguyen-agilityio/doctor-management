import { type RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { type RootStackParamsList } from '@/navigation';

import { Container, ErrorFallback, FoodInfo } from '@/components';
import DetailSkeleton from '@/components/Skeleton/DetailScreen';

import { QUERY_KEYS, ROUTES } from '@/constants';

import { getFoodById } from '@/services/food';

import FavoriteButton from './FavoriteButton';

type DetailRoute = RouteProp<RootStackParamsList, typeof ROUTES.DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const { id } = route.params;

  const {
    isLoading,
    error,
    data: food,
  } = useQuery({
    queryKey: [QUERY_KEYS.FOOD_BY_ID(id)],
    queryFn: () => getFoodById(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <DetailSkeleton />;
  }

  return (
    <Container flex={1} paddingHorizontal={20}>
      {error || !food ? (
        <ErrorFallback
          error={error || ({ message: 'Error fetching food details' } as Error)}
        />
      ) : (
        <>
          <FoodInfo food={food} />
          <FavoriteButton food={food} />
        </>
      )}
    </Container>
  );
};

export default Details;
