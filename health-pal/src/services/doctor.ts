import { APP_TOKEN } from '@app/constants'
import { DoctorQueryKey } from '@app/constants/doctor'

import { MOCK_REVIEWS } from '@app/mocks/reivew'
import { TDoctorData } from '@app/models/doctor'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export const getDoctors = async ({ filters = [], ...params }: StrapiParams) => {
  const searchParams = buildStrapiQuery({
    ...params,
    filters: [
      { key: DoctorQueryKey.doctor, query: '*' },
      { key: DoctorQueryKey.hospital, query: '*' },
      { key: DoctorQueryKey.specialty, query: '*' },
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
      { key: DoctorQueryKey.doctor, query: '*' },
      { key: DoctorQueryKey.hospital, query: '*' },
      { key: DoctorQueryKey.specialty, query: '*' },
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
