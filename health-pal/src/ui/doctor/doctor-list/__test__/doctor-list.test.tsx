import { MOCK_DOCTORS } from '@/mocks/doctor'
import { MOCK_USER } from '@/mocks/user'
import { render } from '@utils-test'

import DoctorList from '..'

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('DoctorList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('matches snapshot with empty data', () => {
    const { toJSON } = render(<DoctorList data={[]} />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('matches snapshot with custom renderItem', () => {
    const { toJSON } = render(<DoctorList data={MOCK_DOCTORS} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
