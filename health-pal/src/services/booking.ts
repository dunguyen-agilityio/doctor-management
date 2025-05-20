import { BookingData } from '@app/models/booking'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export const getBookings = async ({ filters = [], ...params }: StrapiParams) => {
  const searchParams = buildStrapiQuery({
    ...params,
    filters: [
      { key: 'populate[doctor][populate][clinic][fields]', query: 'address' },
      {
        key: 'populate[patient][populate][users_permissions_user][populate][avatar][fields]',
        query: 'url',
      },
      {
        key: 'populate[doctor][populate][users_permissions_user][populate][avatar][fields]',
        query: 'url',
      },
      { key: 'populate[doctor][populate][specialty][fields]', query: 'name' },
      ...filters,
    ],
  })
  const response = await apiClient.get<StrapiPagination<BookingData>>(`bookings?${searchParams}`)
  return response
}
