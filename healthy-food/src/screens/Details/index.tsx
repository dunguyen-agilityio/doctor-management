import { StyleSheet, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { RootStackParamsList } from '@/navigation';

import { ErrorFallback, FoodInfo, Loading } from '@/components';

import { COLOR, QUERY_KEYS, ROUTES } from '@/constants';

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
    return <Loading fullScreen />;
  }

  if (error || !food) {
    return (
      <ErrorFallback
        error={error || ({ message: 'Error fetching food details' } as Error)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FoodInfo food={food} />
      <FavoriteButton food={food} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  button: {
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 12,
  },
});
