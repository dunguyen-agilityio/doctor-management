import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query';

import { FoodOptions, getFoodList } from '@/services/food';

export function useFoods({ categories = [], query = '' }: FoodOptions = {}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [QUERY_KEYS.FOOD, query, ...categories],
    initialPageParam: 1,
    queryFn: ({ pageParam: page }) => getFoodList({ query, categories, page }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
    placeholderData: (prevData) => prevData,
    select: ({ pages }) => pages.flatMap((page) => page.data),
  });

  return infiniteQuery;
}
