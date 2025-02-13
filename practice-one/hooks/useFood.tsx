import { useContext } from 'react';

import { FoodsDispatchContext } from '@contexts/foods';
import { useQuery } from '@tanstack/react-query';

import { FoodOptions, getFoods } from '@services';

export function useFoods(options: FoodOptions) {
  const { categories = [], query, queryKey = 'foods' } = options;
  const dispatch = useContext(FoodsDispatchContext);

  return useQuery({
    queryKey: [queryKey, query, ...categories],
    queryFn: async () => {
      const foods = await getFoods(options);
      dispatch({ type: 'GET_FOODS', payload: foods });
      return foods;
    },
  });
}
