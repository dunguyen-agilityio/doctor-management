import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamsList } from '@navigation';
import { getFoodById, updateFood } from '@hooks';
import { CATEGORIES, COLORS, DETAIL } from '@constants';
import FoodInfo from '@components/FoodInfo';
import { Loading } from '@components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFoodsStore } from '@stores/food';
import { IFood } from '@types';

type DetailRoute = RouteProp<RootStackParamsList, typeof DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const { id } = route.params;

  const setFood = useFoodsStore(({ setFood }) => setFood);

  const { isLoading, data } = useQuery({
    queryKey: ['foods', id + ''],
    queryFn: async () => {
      const food = await getFoodById(id);
      setFood(food);
      return food;
    },
  });

  // Show error
  if (!data) {
    return null;
  }

  const { color, imgUrl, category, name, desc, ingredients, nutritional } =
    data;

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
  const route = useRoute<RouteProp<RootStackParamsList, 'Detail-Screen'>>();
  const id = route.params.id;
  const food = useFoodsStore(({ byId }) => byId[id]);
  const { addFavorite, removeFavorite, setFood } = useFoodsStore();

  const { mutate, isPending } = useMutation({
    mutationFn: updateFood,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['foods-favorite'] });
      setFood(updated);
    },
  });

  const { favorite } = food;

  const handleFavorite = () => {
    mutate({ ...food, favorite: favorite ? 0 : 1 });
    (favorite ? removeFavorite : addFavorite)(id);
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
