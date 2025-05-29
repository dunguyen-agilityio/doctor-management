import { useInfiniteQuery } from '@tanstack/react-query'

import { TDoctorData } from '@app/models/doctor'
import { getDoctors } from '@app/services/doctor'
import { StrapiPagination } from '@app/types/strapi'

import { useAppLoading } from './use-app-loading'

const useDoctors = (query: string, specialty: string[], page: number) => {
  const setAppLoading = useAppLoading()

  const getDoctorsPromise = async ({ pageParam = 1 }: { pageParam: number }) => {
    if (pageParam === 1) {
      setAppLoading(true)
    }

    try {
      const specialties = typeof specialty === 'string' ? [specialty] : specialty

      const filters = specialties
        .filter((item) => item !== 'all')
        .map((value) => ({
          key: `filters[specialty][name][$eqi]`,
          query: value,
        }))

      if (query) {
        filters.push({ key: 'filters[users_permissions_user][name][$containsi]', query })
      }

      const response = await getDoctors({
        pagination: { page: pageParam, pageSize: 10 },
        filters,
      })

      return response
    } catch (error) {
      throw error
    } finally {
      if (pageParam === 1) {
        setAppLoading(false)
      }
    }
  }

  const queryResponse = useInfiniteQuery<
    StrapiPagination<TDoctorData>,
    Error,
    StrapiPagination<TDoctorData>,
    string[],
    number
  >({
    queryKey: ['doctors', ...specialty, query],
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination
      return page < pageCount ? page + 1 : undefined
    },
    initialPageParam: page,
    getPreviousPageParam: (params) => {
      const { page } = params.meta.pagination
      return page > 1 ? page - 1 : undefined
    },
    queryFn: getDoctorsPromise,
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

export default useDoctors
