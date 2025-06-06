import { APP_TOKEN } from '@app/constants'
import { DOCTOR_QUERY_KEY } from '@app/constants/doctor'

import { StrapiPagination, StrapiParams } from '@app/types/strapi'

import { MOCK_REVIEWS } from '@app/mocks/reivew'
import { TDoctorData } from '@app/models/doctor'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export const getDoctors = async ({ filters = [], ...params }: StrapiParams) => {
  const searchParams = buildStrapiQuery({
    ...params,
    filters: [
      { key: DOCTOR_QUERY_KEY.avatar, query: '*' },
      { key: DOCTOR_QUERY_KEY.hospital, query: '*' },
      { key: DOCTOR_QUERY_KEY.specialty, query: 'name' },
      ...filters,
    ],
  })

  const response = await apiClient.get<StrapiPagination<TDoctorData>>(`doctors?${searchParams}`, {
    jwt: APP_TOKEN,
  })
  return response
}

export const getDoctor = async (id: string) => {
  const searchParams = buildStrapiQuery({
    filters: [
      { key: DOCTOR_QUERY_KEY.avatar, query: '*' },
      { key: DOCTOR_QUERY_KEY.address, query: 'address' },
      { key: DOCTOR_QUERY_KEY.specialty, query: 'name' },
    ],
  })

  const response = await apiClient.get<{ data: TDoctorData }>(`doctors/${id}?${searchParams}`, {
    jwt: APP_TOKEN,
  })

  return {
    ...response.data,
    summary: { experience: 2, patients: 20000, rating: 4.3, reviews: 1200 },
    reviews: MOCK_REVIEWS,
  }
}
