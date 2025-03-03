import { StyleSheet, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { RootScreenNavigationProps, RootStackParamsList } from '@/navigation';

import {
  APP_ICONS,
  Button,
  ErrorFallback,
  FoodInfo,
  Icon,
  Loading,
  Text,
} from '@/components';

import { COLOR, ROUTES } from '@/constants';

import { getFoodById } from '@/services/food';

import withFavorite from '@/hocs/withFavorite';

const FavoriteButton = withFavorite(Button, (hasFavorite) => (
  <Text variant="subtitle1" color={COLOR.WHITE}>
    {hasFavorite ? 'Unfavorite' : 'Add to Favorites'}
  </Text>
));

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
    return <Loading />;
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
      <Button
        variant="icon"
        onPress={goBack}
        testID="back-button"
        backgroundColor="transparent"
      >
        <Icon source={APP_ICONS.ARROW_LEFT} />
      </Button>
      <FoodInfo food={food} />
      <FavoriteButton id={id} food={food} style={styles.button} />
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
});
