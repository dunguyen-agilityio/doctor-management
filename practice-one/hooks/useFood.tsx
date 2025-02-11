import { IFood } from '@types';
import { API_FOOD } from '@constants';
import { getFoods } from '@services/food';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFoodsStore } from '@stores/food';

import { useFilterStore } from '@stores/filter';
import { apiClient } from '@services/http-client';

export const getFoodById = async (id: number) => {
  const data = await apiClient.get<IFood>(`${API_FOOD}/${id}`);
  return data;
};

export const updateFood = async (food: IFood) => {
  const { id } = food;

  const newFood = await apiClient.put<IFood>(`foods/${id}`, {
    body: food,
  });

  return newFood;
};

export function useFoods() {
  const { categories, query: search } = useFilterStore();

  const setFoods = useFoodsStore(({ setFoods }) => setFoods);

  const queryKey = ['foods', 'foods' + search, ...categories];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const foods = await getFoods({
        categories,
        query: search,
      });
      setFoods(foods);
      return foods;
    },
  });

  return query;
}

export function useFoodsFavorite() {
  const { categories, query: search } = useFilterStore();
  const queryClient = useQueryClient();

  const setFoods = useFoodsStore(({ setFoods }) => setFoods);

  const query = useQuery({
    queryKey: ['foods-favorite'],
    queryFn: async () => {
      const foods = await getFoods({
        categories,
        favorite: 1,
        query: search,
      });
      queryClient.setQueryData(['foods-favorite'], foods);
      setFoods(foods, true);
      return foods;
    },
  });

  return query;
}
