import { APP_TOKEN } from '@app/constants'
import { BOOKING_MESSAGE, BOOKING_QUERY_KEY } from '@app/constants/booking'

import { BookingForm } from '@app/types/booking'
import { StrapiPagination, StrapiParams } from '@app/types/strapi'

import { Booking, BookingData } from '@app/models/booking'
import { buildStrapiQuery } from '@app/utils/strapi'

import { getJwt } from './auth'
import { APIResponse, apiClient } from './http-client'

export const getBookings = async ({ filters = [], ...params }: StrapiParams) => {
  const searchParams = buildStrapiQuery({
    ...params,
    filters: [
      { key: BOOKING_QUERY_KEY.hospital, query: 'address' },
      {
        key: BOOKING_QUERY_KEY.patient,
        query: 'url',
      },
      {
        key: BOOKING_QUERY_KEY.doctor,
        query: 'url',
      },
      { key: BOOKING_QUERY_KEY.specialty, query: 'name' },
      { key: 'sort', query: 'updatedAt:desc' },
      ...filters,
    ],
  })

  const response = await apiClient.get<StrapiPagination<BookingData>>(`bookings?${searchParams}`, {
    jwt: APP_TOKEN,
  })

  return response
}

type BookingParams = Omit<BookingForm, 'date'> & { date?: string }

export const updateBooking = async ({
  documentId,
  ...formData
}: BookingParams): Promise<APIResponse<Booking>> => {
  try {
    const jwt = await getJwt()
    const response = await apiClient.put<{ data: Booking }>(`bookings/${documentId}`, {
      body: { data: formData },
      jwt,
    })
    return response
  } catch (error) {
    let message = BOOKING_MESSAGE.BOOKING_UPDATE_ERROR

    if (error instanceof Error) {
      message = error.message
    }

    return { error: { message } }
  }
}

export const addBooking = async (formData: BookingParams): Promise<APIResponse<Booking>> => {
  try {
    const jwt = await getJwt()
    const response = await apiClient.post<{ data: Booking }>('bookings', {
      body: { data: formData },
      jwt,
    })
    return response
  } catch (error) {
    let status = 500
    let message = BOOKING_MESSAGE.BOOKING_ERROR

    if (error instanceof Error) {
      if (
        typeof error.cause === 'object' &&
        error.cause !== null &&
        'status' in error.cause &&
        typeof error.cause.status === 'number'
      ) {
        status = error.cause.status ?? 500
      }

      message = error.message
    }

    return { error: { message, code: status } }
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
