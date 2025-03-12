import { useInfiniteQuery } from '@tanstack/react-query';

import { FoodOptions, getFoodList } from '@/services/food';

export function useFoodList({
  filters = [],
  query = '',
  queryKey,
}: FoodOptions = {}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [queryKey, query, ...filters],
    initialPageParam: 1,
    queryFn: ({ pageParam: page }) => getFoodList({ query, filters, page }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
    placeholderData: (prevData) => prevData,
    select: ({ pages }) => pages.flatMap((page) => page.data),
  });

  return infiniteQuery;
}
