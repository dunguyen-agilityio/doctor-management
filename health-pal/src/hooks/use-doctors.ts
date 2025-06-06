import { useInfiniteQuery } from '@tanstack/react-query'

import { DOCTOR_QUERY_KEY } from '@app/constants/doctor'

import { getDoctors } from '@app/services/doctor'

import { StrapiPagination } from '@app/types/strapi'

import { TDoctorData } from '@app/models/doctor'

const useDoctors = (query: string, specialty: string[]) => {
  const getDoctorsPromise = async ({ pageParam = 1 }: { pageParam: number }) => {
    const specialties = typeof specialty === 'string' ? [specialty] : specialty

    const filters = specialties
      .filter((item) => item !== 'all')
      .map((value) => ({
        key: DOCTOR_QUERY_KEY.filterSpecialty,
        query: value,
      }))

    filters.push({ key: 'sort', query: 'id:asc' })

    if (query) {
      filters.push({ key: DOCTOR_QUERY_KEY.query, query })
    }

    const response = await getDoctors({
      pagination: { page: pageParam, pageSize: 10 },
      filters,
    })

    return response
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
    initialPageParam: 1,
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
