import { BOOKING_TABS } from '@app/types/booking'

import { Doctor } from './doctor'
import { Patient } from './patient'
import { Strapi } from './strapi'
import { User } from './user'

export class Booking extends Strapi {
  date!: Date
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
  date: Date
  documentId: string
  id: number
  time: string
  type: BOOKING_TABS
  doctorName: string
  doctorAvatar: string | undefined
  address: string
  specialty: string
  doctorId: string
}

export const BookingKey = {
  type: 'filters[type][$eq]',
}
