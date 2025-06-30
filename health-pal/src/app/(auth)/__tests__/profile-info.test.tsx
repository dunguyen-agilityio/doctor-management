import { render } from '@utils-test'

import ProfileInfo from '../profile-info'

describe('<ProfileInfo />', () => {
  it('render correctly', async () => {
    const { getByTestId } = render(<ProfileInfo />)
    expect(getByTestId('user-profile')).toBeTruthy()
  })
})
