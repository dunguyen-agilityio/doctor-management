import { APP_TOKEN } from '@app/constants'

import { MOCK_REVIEWS } from '@app/mocks/reivew'
import { Doctor } from '@app/models/doctor'
import { User } from '@app/models/user'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export type DoctorData = Doctor & { users_permissions_user: User }

export const getDoctors = async ({ filters = [], ...params }: StrapiParams) => {
  const searchParams = buildStrapiQuery({
    ...params,
    filters: [
      { key: 'populate[users_permissions_user][populate]', query: '*' },
      { key: 'populate[clinic][populate]', query: '*' },
      { key: 'populate[specialty][populate]', query: '*' },
      ...filters,
    ],
  })

  const response = await apiClient.get<StrapiPagination<DoctorData>>(`doctors?${searchParams}`, {
    jwt: APP_TOKEN,
  })
  return response
}

export const getDoctor = async (id: string) => {
  const searchParams = buildStrapiQuery({
    filters: [
      { key: 'populate[users_permissions_user][populate]', query: '*' },
      { key: 'populate[clinic][populate]', query: '*' },
      { key: 'populate[specialty][populate]', query: '*' },
    ],
  })

  const response = await apiClient.get<{ data: DoctorData }>(`doctors/${id}?${searchParams}`, {
    jwt: APP_TOKEN,
  })

  return {
    data: {
      ...response.data,
      summary: { experience: 2, patients: 20000, rating: 4.3, reviews: 1200 },
      reviews: MOCK_REVIEWS,
    },
  }
}
