import { APP_TOKEN } from '@app/constants'

import { Booking, BookingData } from '@app/models/booking'
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

  const response = await apiClient.get<StrapiPagination<BookingData>>(`bookings?${searchParams}`, {
    jwt: APP_TOKEN,
  })
  return response
}

export const updateBooking = async (
  { documentId, ...rest }: Partial<Omit<Booking, 'documentId'> & { documentId: string }>,
  jwt: string,
) => {
  const response = await apiClient.put<{ data: Booking }>(`bookings/${documentId}`, {
    body: { data: rest },
    jwt,
  })
  return response
}
