import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import { TIME_SLOTS } from '@/constants/booking'

import { getBookingAvailable } from '@/services/booking'

import { BOOKING_TABS } from '@/types'

import Bookings from '../bookings'

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

const available = TIME_SLOTS.reduce((prev, time) => ({ ...prev, [time]: true }), {})

jest.mock('@/services/booking', () => ({
  ...jest.requireActual('@/services/booking'),
  getBookingAvailable: jest.fn(),
}))

describe('Booking', () => {
  beforeEach(() => {
    ;(getBookingAvailable as jest.Mock).mockResolvedValue({ available, doctorId: 'doctor-id' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const { getByText } = render(<Bookings />)
    expect(getByText(BOOKING_TABS.UPCOMING)).toBeTruthy()
  })
})
