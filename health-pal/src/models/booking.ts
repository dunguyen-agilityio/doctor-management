import { Doctor } from './doctor'
import { Patient } from './patient'
import { Strapi } from './strapi'

export class Booking extends Strapi {
  date!: Date
  time!: string
  status!: 'upcoming' | 'completed' | 'cancelled'
  patient!: Patient
  doctor!: Doctor

  constructor(booking: Booking) {
    super(booking)
    Object.assign(this, booking)
  }
}
