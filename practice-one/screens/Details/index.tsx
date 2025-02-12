import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { RootStackParamsList } from '@navigation';

import { FoodInfo, Loading } from '@components';

import { CATEGORIES, COLORS, ROUTES } from '@constants';

import { useFoodsStore } from '@stores/food';

import { getFoodById, updateFood } from '@services/food';

type DetailRoute = RouteProp<RootStackParamsList, typeof ROUTES.DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const { id } = route.params;

  const setFood = useFoodsStore(({ setFood }) => setFood);
  const food = useFoodsStore(({ byId }) => byId[id]);

  const { isLoading } = useQuery({
    queryKey: ['foods', 'foods' + id],
    queryFn: async () => {
      const food = await getFoodById(id);
      setFood(food);
      return food;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { color, imgUrl, category, name, desc, ingredients, nutritional } =
    food;

  const categoryName = CATEGORIES.find(({ id }) => id == category)?.name || '';

  return (
    <FoodInfo
      category={categoryName}
      color={color}
      desc={desc}
      imgUrl={imgUrl}
      name={name}
      ingredients={ingredients}
      nutritional={nutritional}
    >
      <FavoriteButton />
      {isLoading && <Loading />}
    </FoodInfo>
  );
};

export default Details;

const FavoriteButton = () => {
  const queryClient = useQueryClient();
  const route = useRoute<RouteProp<RootStackParamsList, ROUTES.DETAIL>>();
  const id = route.params.id;
  const food = useFoodsStore(({ byId }) => byId[id]);
  const { addFavorite, removeFavorite, setFood } = useFoodsStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateFood,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['foods-favorite'] });
      setFood(updated);
      (favorite ? removeFavorite : addFavorite)(id);
    },
  });

  const { favorite } = food;

  const handleFavorite = () => {
    mutate({ ...food, favorite: favorite ? 0 : 1 });
  };

  return (
    <TouchableOpacity
      onPress={handleFavorite}
      style={styles.button}
      disabled={isPending}
    >
      {isPending ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Text style={styles.textButton}>
          {favorite ? 'UnFavorites' : 'Add to Favorites'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 9,
    paddingVertical: 9,
    marginTop: 27,
    backgroundColor: COLORS.PRIMARY,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
