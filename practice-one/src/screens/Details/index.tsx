import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { RootScreenNavigationProps, RootStackParamsList } from '@/navigation';

import {
  Back,
  ErrorFallback,
  FavoriteButton,
  FoodInfo,
  Loading,
} from '@/components';

import { CATEGORIES, COLORS, ROUTES } from '@/constants';

import { IFood } from '@/types';

import { getFoodById } from '@/services/food';

type DetailRoute = RouteProp<RootStackParamsList, typeof ROUTES.DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const queryClient = useQueryClient();
  const { goBack } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.DETAIL>>();

  const { id } = route.params;

  const { isLoading, data, error, refetch } = useQuery<IFood>({
    queryKey: [`food-${id}`],
    queryFn: async () => {
      const food = await getFoodById(id);
      queryClient.setQueryData<IFood>([`food-${id}`], food);
      return food;
    },
  });

  const categoryName = useMemo(() => {
    return (
      CATEGORIES.find(({ id: catId }) => catId === data?.category)?.name ||
      'Unknown'
    );
  }, [data?.category]);

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
        <FavoriteButton
          favorite={!!data.favorite}
          id={id}
          onRefetch={refetch}
        />
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingTop: 63,
  },
  buttonWrapper: { paddingHorizontal: 10 },
});
