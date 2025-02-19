import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { RootScreenNavigationProps, RootStackParamsList } from '@/navigation';

import {
  Back,
  ErrorFallback,
  FavoriteButton,
  FoodInfo,
  Loading,
} from '@/components';

import { CATEGORIES, COLOR, ROUTES } from '@/constants';

import { IFood } from '@/types';

import { getFoodById } from '@/services/food';

type DetailRoute = RouteProp<RootStackParamsList, typeof ROUTES.DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const { goBack } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.DETAIL>>();

  const { id } = route.params;

  const { isLoading, data, error, refetch } = useQuery<IFood>({
    queryKey: [`food-${id}`],
    queryFn: async () => {
      const food = await getFoodById(id);
      return food;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { category, favorite, favoriteId } = data ?? {};

  const categoryName = useMemo(
    () =>
      CATEGORIES.find(({ id: catId }) => catId === category)?.name || 'Unknown',
    [category],
  );

  if (isLoading) return <Loading />;
  if (error || !data)
    return <ErrorFallback error={error as Error} onRetry={refetch} />;

  return (
    <View style={styles.container}>
      <Back onPress={goBack} />
      <FoodInfo
        category={categoryName}
        color={data.color}
        desc={data.desc}
        imgUrl={data.imgUrl}
        name={data.name}
        ingredients={data.ingredients}
        nutritional={data.nutritional}
      />
      <View style={styles.buttonWrapper}>
        <FavoriteButton favorite={favorite} id={id} favoriteId={favoriteId} />
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 20,
  },
  buttonWrapper: { paddingHorizontal: 10 },
});
