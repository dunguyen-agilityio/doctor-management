import { MOCK_BOOKING } from '@/mocks/booking'

import dayjs from 'dayjs'

import { BOOKING_TABS } from '@/types'

import { formatBooking } from '../booking'

describe('formatBooking', () => {
  it('formats UPCOMING booking with all fields', () => {
    const result = formatBooking(MOCK_BOOKING)

    expect(result).toEqual({
      id: 1,
      documentId: 'doc-1',
      date: dayjs('2025-06-01'),
      time: '09:00 AM',
      type: BOOKING_TABS.UPCOMING,
      doctorName: 'John Doe',
      doctorAvatar: 'https://example.com/avatar.jpg',
      address: '123 Main St, Springfield, USA',
      specialty: 'Cardiology',
      doctorDocId: 'doc_001',
      doctorId: 1,
    })
  })
})
