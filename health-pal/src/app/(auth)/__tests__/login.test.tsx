import { render } from '@utils-test'

import LoginScreen from '../login'

describe('<LoginScreen />', () => {
  it('matches snapshot after loading', async () => {
    const { toJSON } = render(<LoginScreen />)
    expect(toJSON()).toMatchSnapshot()
  })
})
