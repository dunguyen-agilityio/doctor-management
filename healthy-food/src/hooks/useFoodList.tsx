import { useInfiniteQuery } from '@tanstack/react-query';

import { FoodOptions, getFoodList } from '@/services/food';

export function useFoodList({
  filters = [],
  query = '',
  queryKey,
  pageSize,
}: FoodOptions = {}) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: [queryKey, pageSize, query, ...filters],
    initialPageParam: 1,
    staleTime: 5 * 1000 * 60,
    queryFn: ({ pageParam: page }) =>
      getFoodList({ query, filters, page, pageSize }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
    placeholderData: (prevData) => prevData,
    select: ({ pages }) => pages.flatMap((page) => page.data),
  });

  return infiniteQuery;
}
