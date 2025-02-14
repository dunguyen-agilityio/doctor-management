import { StyleSheet, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { RootScreenNavigationProps, RootStackParamsList } from '@navigation';

import { Back, FavoriteButton, FoodInfo, Loading } from '@components';

import { CATEGORIES, COLORS, ROUTES } from '@constants';

import { IFood } from '@types';

import { getFoodById } from '@services/food';

type DetailRoute = RouteProp<RootStackParamsList, typeof ROUTES.DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const queryClient = useQueryClient();
  const { goBack } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.DETAIL>>();
  const { id } = route.params;

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['foods', 'foods/' + id],
    queryFn: async () => {
      const food = await getFoodById(id);
      queryClient.setQueryData<IFood>(['foods/' + id], food);
      return food;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) return null;

  const {
    color,
    imgUrl,
    category,
    name,
    desc,
    ingredients,
    nutritional,
    favorite,
  } = data;

  const categoryName = CATEGORIES.find(({ id }) => id == category)?.name || '';

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Back onPress={goBack} />
      <FoodInfo
        category={categoryName}
        color={color}
        desc={desc}
        imgUrl={imgUrl}
        name={name}
        ingredients={ingredients}
        nutritional={nutritional}
      />
      <View style={styles.buttonWrapper}>
        <FavoriteButton favorite={!!favorite} id={id} onRefetch={refetch} />
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
