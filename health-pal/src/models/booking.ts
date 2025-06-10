import { Dayjs } from 'dayjs'

import { BOOKING_TABS } from '@app/types/booking'

import { Doctor } from './doctor'
import { Patient } from './patient'
import { Strapi } from './strapi'
import { User } from './user'

export class Booking extends Strapi {
  date!: string
  time!: string
  type!: BOOKING_TABS
  patient!: Patient
  doctor!: Doctor

  constructor(booking: Booking) {
    super(booking)
    Object.assign(this, booking)
  }
}

export type BookingData = Omit<Booking, 'doctor'> & {
  doctor: Doctor & { users_permissions_user: User }
}

export type TBookingCard = {
  date: Dayjs
  documentId: string
  id: number
  time: string
  type: BOOKING_TABS
  doctorName: string
  doctorAvatar: string | undefined
  address: string
  specialty: string
  doctorId: number
  doctorDocId: string
}

export const BookingKey = {
  type: 'filters[type][$eq]',
}
