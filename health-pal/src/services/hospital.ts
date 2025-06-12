import { Hospital } from '@/models/hospital'
import { buildStrapiQuery } from '@/utils/strapi'

import { APP_TOKEN } from '@/constants'

import { StrapiPagination, StrapiParams } from '@/types/strapi'

import { apiClient } from './http-client'

export const getHospitals = async (params?: StrapiParams) => {
  const { filters = [], ...rest } = params ?? {}

  const searchParams = buildStrapiQuery({
    ...rest,
    filters: [...filters, { key: 'populate[image][fields][1]', query: 'url' }],
  })
  const response = await apiClient.get<StrapiPagination<Hospital>>(`hospitals?${searchParams}`, {
    jwt: APP_TOKEN,
  })
  return response
}
