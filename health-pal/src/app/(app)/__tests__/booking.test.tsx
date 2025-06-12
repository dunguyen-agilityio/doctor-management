import { render } from '@utils-test'

import { TIME_SLOTS } from '@/constants/booking'

import { getBookingAvailable } from '@/services/booking'

import Booking from '../booking'

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { jwt: 'fake-jwt-token' },
  }),
}))

const available = TIME_SLOTS.reduce((prev, time) => ({ ...prev, [time]: true }), {})

jest.mock('@/services/booking', () => ({
  ...jest.requireActual('@/services/booking'),
  getBookingAvailable: jest.fn(),
}))

describe('Booking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getBookingAvailable as jest.Mock).mockResolvedValue({ available, doctorId: 'doctor-id' })
  })
  it('should render correctly', () => {
    const { getByText } = render(<Booking />)
    expect(getByText('Select Date')).toBeTruthy()
  })

  it('should render correctly', () => {
    const { toJSON } = render(<Booking />)
    expect(toJSON()).toMatchSnapshot()
  })
})
