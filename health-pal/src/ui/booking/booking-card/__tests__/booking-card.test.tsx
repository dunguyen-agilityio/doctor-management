import { MOCK_USER } from '@/mocks/user'
import { formatDate } from '@/utils/date'
import { render, screen } from '@utils-test'

import dayjs from 'dayjs'

import { useRequireAuth } from '@/hooks/use-require-auth'

import { BOOKING_TABS } from '@/types/booking'

import BookingCard from '..'

jest.mock('@/hooks/use-require-auth')

describe('BookingCard', () => {
  const defaultProps = {
    date: dayjs('2025-07-01'),
    time: '10:00 AM',
    doctorName: 'Dr. John Doe',
    specialty: 'Cardiology',
    doctorAvatar: 'https://example.com/avatar.jpg',
    address: '123 Main St, City',
    documentId: 'booking1',
    doctorId: 1,
    doctorDocId: 'doc-ref1',
    type: BOOKING_TABS.UPCOMING,
    id: 1,
  }

  beforeEach(() => {
    ;(useRequireAuth as jest.Mock).mockImplementation(() => ({
      session: { user: MOCK_USER },
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders card content', () => {
    render(<BookingCard {...defaultProps} />)

    expect(screen.getByLabelText('Booking with Dr. John Doe')).toBeTruthy()
    expect(screen.getByText(formatDate(defaultProps.date))).toBeTruthy()
    expect(screen.getByText('Dr. John Doe')).toBeTruthy()
    expect(screen.getByText('Cardiology')).toBeTruthy()
    expect(screen.getByText('123 Main St, City')).toBeTruthy()
    expect(screen.getByTestId('cloudinary-image')).toHaveProp(
      'source',
      expect.arrayContaining([
        {
          uri: 'https://example.com/avatar.jpg',
        },
      ]),
    )
    expect(screen.getByTestId('booking-action')).toBeTruthy()
  })

  it('has correct accessibility attributes', () => {
    render(<BookingCard {...defaultProps} />)

    const card = screen.getByLabelText('Booking with Dr. John Doe')
    expect(card).toHaveProp('aria-label', 'Booking with Dr. John Doe')
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<BookingCard {...defaultProps} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
