import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query';

import { FoodOptions, getFoods } from '@/services';

import { FoodsDispatchContext } from '@/contexts/foods';

export function useFoods(options?: FoodOptions) {
  const { categories = [], query, queryKey = QUERY_KEYS.FOOD } = options ?? {};
  const dispatch = useContext(FoodsDispatchContext);

  const queryKeys = [
    queryKey,
    ...categories,
    ...(query !== null ? [query] : []),
  ];

  return useQuery({
    queryKey: queryKeys,
    queryFn: async () => {
      const foods = await getFoods(options);
      dispatch({ type: 'GET_FOODS', payload: foods });
      return foods;
    },
  });
}
