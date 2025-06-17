import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import { useLocalSearchParams } from 'expo-router'

import { FAVORITE_TYPES } from '@/types'

import Profile from '../profile'

jest.mock('expo-router')
jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<Profile />', () => {
  it('render correctly', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      type: FAVORITE_TYPES.DOCTOR,
    })
    const { getByLabelText } = render(<Profile />)
    expect(getByLabelText('Edit profile')).toBeTruthy()
  })
})
