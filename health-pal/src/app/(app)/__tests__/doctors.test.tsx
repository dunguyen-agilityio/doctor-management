import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import { useLocalSearchParams } from 'expo-router'

import Doctors from '../doctors/[specialty]'

jest.mock('expo-router')
jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<Doctors />', () => {
  it('render correctly', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      specialty: [],
      query: 'qu',
      searching: true,
    })
    const { getByLabelText } = render(<Doctors />)
    expect(getByLabelText('Search for doctors by name')).toBeTruthy()
  })
})
