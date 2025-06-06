import { BOOKING_TABS } from '@app/types'

import { MOCK_BOOKING } from '@app/mocks/booking'

import { formatBooking } from '../booking'

jest.mock('@app/models/booking', () => ({
  BookingData: jest.fn(),
  BOOKING_TABS: {
    UPCOMING: 'UPCOMING',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED',
  },
}))

describe('formatBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('formats UPCOMING booking with all fields', () => {
    const result = formatBooking(MOCK_BOOKING)

    expect(result).toEqual({
      id: 1,
      documentId: 'doc-1',
      date: '2025-06-01',
      time: '09:00 AM',
      type: BOOKING_TABS.UPCOMING,
      doctorName: 'John Doe',
      doctorAvatar: 'https://example.com/avatar.jpg',
      address: '123 Main St, Springfield, USA',
      specialty: 'Cardiology',
      doctorId: 'doc_001',
    })
  })
})
