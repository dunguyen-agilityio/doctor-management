import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import EditProfile from '../edit-profile'

jest.mock('expo-router')
jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<EditProfile />', () => {
  it('render correctly', async () => {
    const { getByTestId } = render(<EditProfile />)
    expect(getByTestId('user-profile')).toBeTruthy()
  })
})
