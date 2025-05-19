import { render } from '@utils-test'

import { Button } from '@app/theme'

describe('MyButton', () => {
  test('Text renders correctly on MyButton', () => {
    const { getByText, toJSON } = render(<Button>My Button!</Button>)
    const tree = toJSON()
    expect(tree).toMatchSnapshot()

    expect(getByText('My Button!')).toBeVisible()
  })
})
