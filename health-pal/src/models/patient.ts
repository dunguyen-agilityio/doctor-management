import { Booking } from './booking'
import { User } from './user'

export class Patient extends User {
  bookings: Booking[]

  constructor(patient: Patient) {
    super(patient)
    this.bookings = patient.bookings
  }
}
