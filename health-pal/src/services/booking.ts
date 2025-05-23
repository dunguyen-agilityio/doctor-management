import { APP_TOKEN } from '@app/constants'

import { Booking, BookingData } from '@app/models/booking'
import { BookingForm } from '@app/types/booking'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'
import { buildStrapiQuery } from '@app/utils/strapi'

import { APIResponse, apiClient } from './http-client'

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
      { key: 'sort', query: 'updatedAt:desc' },
      ...filters,
    ],
  })

  const response = await apiClient.get<StrapiPagination<BookingData>>(`bookings?${searchParams}`, {
    jwt: APP_TOKEN,
  })
  return response
}

export const updateBooking = async (
  { documentId, ...rest }: BookingForm,
  jwt: string,
): Promise<APIResponse<Booking>> => {
  try {
    const response = await apiClient.put<{ data: Booking }>(`bookings/${documentId}`, {
      body: { data: rest },
      jwt,
    })
    return response
  } catch (error) {
    let message = 'Failed to add Booking'

    if (error instanceof Error) {
      message = error.message
    }

    return { error: { message } }
  }
}

export const addBooking = async (
  formData: BookingForm,
  jwt: string,
): Promise<APIResponse<Booking>> => {
  try {
    const response = await apiClient.post<{ data: Booking }>('bookings', {
      body: { data: formData },
      jwt,
    })
    return response
  } catch (error) {
    let message = 'Failed to add Booking'

    if (error instanceof Error) {
      message = error.message
    }

    return { error: { message } }
  }
}

export const getBookingAvailable = async (docId: string, date: string) => {
  const searchParams = buildStrapiQuery({
    filters: [
      { key: 'docId', query: docId },
      {
        key: 'date',
        query: date,
      },
    ],
  })

  const response = await apiClient.get<{ available: Record<string, boolean>; doctorId: number }>(
    `booking-available?${searchParams}`,
    {
      jwt: APP_TOKEN,
    },
  )

  return response
}
