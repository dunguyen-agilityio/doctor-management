import { Clinic } from '@app/models/clinic'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export const getHospitals = async ({ filters = [], ...params }: StrapiParams) => {
  const searchParams = buildStrapiQuery({
    ...params,
    filters: [...filters, { key: 'populate[image][fields][1]', query: 'url' }],
  })
  const response = await apiClient.get<StrapiPagination<Clinic>>(`hospitals?${searchParams}`)
  return response
}
