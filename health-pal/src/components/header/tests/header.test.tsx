import { render } from '@utils-test'

import Header from '../'

describe('Header', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<Header title="Home" />)
    expect(toJSON()).toMatchSnapshot()
  })
})
