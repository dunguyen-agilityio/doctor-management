import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'

import { QUERY_KEY } from '@app/react-query.config'
import { getDoctors } from '@app/services/doctor'

const useDoctors = () => {
  const params = useLocalSearchParams<{
    specialty: string | string[]
    query: string
    page: string
  }>()

  const { specialty, query, page = '1' } = params

  const getDoctorsPromise = () => {
    const specialties = typeof specialty === 'string' ? [specialty] : specialty

    const filters = specialties
      .filter((item) => item !== 'all')
      .map((value) => ({
        key: `filters[specialty][name][$eqi]`,
        query: value,
      }))

    if (query) {
      filters.push({ key: 'filters[users_permissions_user][username][$containsi]', query })
    }

    return getDoctors({
      pagination: { page: parseInt(page) },
      filters,
    })
  }

  const queryResponse = useQuery({
    queryKey: [...QUERY_KEY.DOCTORS, page, ...specialty, query],
    queryFn: getDoctorsPromise,
    placeholderData: (previousData) => previousData,
  })

  return queryResponse
}

export default useDoctors
