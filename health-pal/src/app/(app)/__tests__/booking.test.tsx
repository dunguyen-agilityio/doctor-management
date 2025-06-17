import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import { useLocalSearchParams } from 'expo-router'

import Booking from '../booking'

jest.mock('expo-router')
jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<Booking />', () => {
  it('render correctly', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      doctorId: 1,
      doctorDocId: 'doctor01',
    })
    const { getByTestId } = render(<Booking />)
    expect(getByTestId('booking-button')).toBeTruthy()
  })
})
