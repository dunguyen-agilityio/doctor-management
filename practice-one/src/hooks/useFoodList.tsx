import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query';

import { FoodOptions, getFoodList } from '@/services/food';

export function useFoodList({
  categoriesValue = [],
  query = '',
}: FoodOptions = {}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [QUERY_KEYS.FOOD, query, ...categoriesValue],
    initialPageParam: 1,
    queryFn: ({ pageParam: page }) =>
      getFoodList({ query, categoriesValue, page }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
    placeholderData: (prevData) => prevData,
    select: ({ pages }) => pages.flatMap((page) => page.data),
  });

  return infiniteQuery;
}
