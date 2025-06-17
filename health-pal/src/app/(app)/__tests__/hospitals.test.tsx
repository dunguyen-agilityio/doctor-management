import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import { useLocalSearchParams } from 'expo-router'

import Hospitals from '../hospitals'

jest.mock('expo-router')
jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<Hospitals />', () => {
  it('render correctly', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      specialty: [],
      query: 'qu',
      searching: true,
    })
    const { getByLabelText } = render(<Hospitals />)
    expect(getByLabelText('Search for hospitals by name')).toBeTruthy()
  })
})
