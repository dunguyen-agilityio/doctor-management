import { APP_TOKEN } from '@app/constants'

import { Clinic } from '@app/models/clinic'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export const getHospitals = async (params?: StrapiParams) => {
  const { filters = [], ...rest } = params ?? {}

  const searchParams = buildStrapiQuery({
    ...rest,
    filters: [...filters, { key: 'populate[image][fields][1]', query: 'url' }],
  })
  const response = await apiClient.get<StrapiPagination<Clinic>>(`hospitals?${searchParams}`, {
    jwt: APP_TOKEN,
  })
  return response
}
