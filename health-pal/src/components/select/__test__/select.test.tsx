import { render, screen } from '@utils-test'

import Select from '..'

describe('Select', () => {
  const items = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]

  it('renders error message when provided', () => {
    render(<Select items={items} native errorMessage="Required field" />)

    const errorText = screen.getByText('Required field')
    expect(errorText).toHaveStyle({
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 18,
      color: 'red',
    })
  })
})
