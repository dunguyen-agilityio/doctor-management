import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { RootScreenNavigationProps, RootStackParamsList } from '@/navigation';

import { ErrorFallback, FoodInfo } from '@/components';
import IconButton from '@/components/IconButton';

import { COLOR, ROUTES } from '@/constants';

import { getFoodById } from '@/services/food';

import FavoriteButton from './FavoriteButton';

type DetailRoute = RouteProp<RootStackParamsList, typeof ROUTES.DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const { goBack } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.DETAIL>>();
  const { id } = route.params;

  const {
    isLoading,
    error,
    data: food,
  } = useQuery({
    queryKey: [`food-${id}`],
    queryFn: () => getFoodById(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={COLOR.LIGHT_GREEN}
        testID="loading-indicator"
      />
    );
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
      <IconButton
        icon={require('@assets/icons/back.png')}
        onPress={goBack}
        testID="back-button"
      />
      <FoodInfo food={food} />
      <FavoriteButton id={id} food={food} />
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
});
