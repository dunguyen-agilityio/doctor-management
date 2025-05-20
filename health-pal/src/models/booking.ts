import { Doctor } from './doctor'
import { Patient } from './patient'
import { Strapi } from './strapi'
import { User } from './user'

export class Booking extends Strapi {
  date!: Date
  time!: string
  type!: 'upcoming' | 'completed' | 'cancelled'
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
