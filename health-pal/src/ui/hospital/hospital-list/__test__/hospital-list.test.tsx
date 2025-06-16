import { MOCK_HOSPITALS } from '@/mocks/hospital'
import { MOCK_USER } from '@/mocks/user'
import { render, screen } from '@utils-test'

import HospitalList from '..'

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

const [name1, name2] = MOCK_HOSPITALS.map((item) => item.name)

describe('HospitalList', () => {
  it('renders hospital items', () => {
    render(<HospitalList data={MOCK_HOSPITALS} />)

    expect(screen.getByText(name1)).toBeTruthy()
    expect(screen.getByText(name2)).toBeTruthy()
  })

  it('renders nothing if data is empty', () => {
    const { toJSON } = render(<HospitalList data={[]} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
