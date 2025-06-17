import { render } from '@utils-test'

import SignUp from '../sign-up'

describe('<SignUp />', () => {
  it('matches snapshot after loading', async () => {
    const { toJSON } = render(<SignUp />)
    expect(toJSON()).toMatchSnapshot()
  })
})
