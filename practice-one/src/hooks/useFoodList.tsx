import { useInfiniteQuery } from '@tanstack/react-query';

import { FoodOptions, getFoodList } from '@/services/food';

export function useFoodList({
  categoriesValue = [],
  query = '',
  queryKey,
}: FoodOptions = {}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [queryKey, query, ...categoriesValue],
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
