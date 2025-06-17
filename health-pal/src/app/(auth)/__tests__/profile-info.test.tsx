import { render } from '@utils-test'

import ProfileInfo from '../profile-info'

describe('<ProfileInfo />', () => {
  it('matches snapshot after loading', async () => {
    const { toJSON } = render(<ProfileInfo />)
    expect(toJSON()).toMatchSnapshot()
  })
})
