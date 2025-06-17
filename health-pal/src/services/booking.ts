import { Booking, BookingData } from '@/models/booking'
import { buildStrapiQuery } from '@/utils/strapi'

import { APP_TOKEN } from '@/constants'
import { BOOKING_MESSAGE, BOOKING_QUERY_KEY } from '@/constants/booking'

import { BookingForm } from '@/types/booking'
import { APIResponse, StrapiPagination, StrapiParams } from '@/types/strapi'

import { getJwt } from './auth'
import { apiClient } from './http-client'

export const getBookings = async ({
  filters = [],
  userId,
  ...params
}: StrapiParams & { userId: number }) => {
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
      { key: 'filters[user][id][$eq]', query: String(userId) },
      ...filters,
    ],
  })

  const jwt = await getJwt()
  const response = await apiClient.get<StrapiPagination<BookingData>>(`bookings?${searchParams}`, {
    jwt,
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

  const response = await apiClient.get<{
    available: Record<string, boolean>
    doctorId: number
    dates: string[]
  }>(`booking-available?${searchParams}`, {
    jwt: APP_TOKEN,
  })

  return response
}
