import { useQuery } from '@tanstack/react-query';

import { useFoodsStore } from '@stores';

import { FoodOptions, getFoods } from '@services';

export function useFoods({
  categories = [],
  favorite,
  query: search,
}: FoodOptions) {
  const setFoods = useFoodsStore(({ setFoods }) => setFoods);

  const mainKey = favorite ? 'foods-favorite' : 'foods';

  const queryKey = [mainKey, mainKey + search, ...categories];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const foods = await getFoods({
        categories,
        query: search,
        favorite,
      });
      setFoods(foods, !!favorite);
      return foods;
    },
  });

  return query;
}
