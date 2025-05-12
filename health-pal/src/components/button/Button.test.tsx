import { render } from '@testing-library/react-native'

import { MyButton } from '.'

describe('MyButton', () => {
  test('Text renders correctly on MyButton', () => {
    const { getByText, toJSON } = render(<MyButton text="My Button!" />)
    const tree = toJSON()
    expect(tree).toMatchSnapshot()

    expect(getByText('My Button!')).toBeVisible()
  })
})
