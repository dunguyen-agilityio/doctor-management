import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import { useLocalSearchParams } from 'expo-router'

import DoctorDetails from '../doctors/details/[id]'

jest.mock('expo-router')
jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<DoctorDetails />', () => {
  it('matches snapshot after loading', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      id: 'doctor01',
    })
    const { toJSON } = render(<DoctorDetails />)
    expect(toJSON()).toMatchSnapshot()
  })
})
