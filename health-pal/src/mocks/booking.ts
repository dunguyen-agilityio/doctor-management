import { BookingData } from '@/models/booking'

import { BOOKING_TABS } from '@/types/booking'

import { MOCK_DOCTORS } from './doctor'
import { MOCK_PATIENT } from './patient'

export const MOCK_BOOKING: BookingData = {
  id: 1,
  documentId: 'doc-1',
  date: '2025-06-01',
  time: '09:00 AM',
  type: BOOKING_TABS.UPCOMING,
  patient: MOCK_PATIENT,
  doctor: MOCK_DOCTORS[0],
}
