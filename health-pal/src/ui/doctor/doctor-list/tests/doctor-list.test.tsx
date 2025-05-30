import { render } from '@utils-test'

import { MOCK_DOCTORS } from '@app/mocks/doctor'

import DoctorList from '../'

describe('DoctorList', () => {
  beforeEach(() => {
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
