import { useInfiniteQuery } from '@tanstack/react-query'

import { getHospitals } from '@/services/hospital'

const useHospitals = (query = '') => {
  const queryResponse = useInfiniteQuery({
    queryKey: ['hospitals', query],
    queryFn: async ({ pageParam }) => {
      const filters = [{ key: 'sort', query: 'id:asc' }]

      if (query) {
        filters.push({
          key: `filters[name][$containsi]`,
          query,
        })
      }

      const response = await getHospitals({
        filters,
        pagination: { page: pageParam, pageSize: 10 },
      })

      return response
    },
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination
      return page < pageCount ? page + 1 : undefined
    },
    initialPageParam: 1,
    getPreviousPageParam: (params) => {
      const { page } = params.meta.pagination
      return page > 1 ? page - 1 : undefined
    },
    placeholderData: (previousData) => previousData,
    select: ({ pages }) => ({
      meta: {
        pagination: pages[pages.length - 1]?.meta.pagination || {
          page: 1,
          pageCount: 1,
        },
      },
      data: pages.flatMap((page) => page.data),
    }),
  })

  return queryResponse
}

export default useHospitals
