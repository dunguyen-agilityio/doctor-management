import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import Home from '..'

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('<Home />', () => {
  it('render correctly', async () => {
    const { getByLabelText } = render(<Home />)
    expect(getByLabelText('Home screen')).toBeTruthy()
  })
})
