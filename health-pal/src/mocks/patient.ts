import { Patient } from '@/models/patient'

import { MOCK_USER } from './user'

export const MOCK_PATIENT: Patient = {
  bookings: [],
  ...MOCK_USER,
}
