import { fireEvent, render, screen } from '@utils-test'

import Select from '.'

describe('Select', () => {
  const items = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]

  it('renders trigger with placeholder and icons', () => {
    render(<Select items={items} native placeholder="Select an option" />)

    const trigger = screen.getByTestId('trigger')
    expect(trigger).toHaveStyle({
      height: 48,
    })

    const value = screen.getByText('Select an option')
    expect(value).toHaveStyle({
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 24,
      color: '#374151',
    })
  })

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

  it('renders label and items in viewport', () => {
    render(<Select items={items} label="Options" open />)

    const label = screen.getByText('Options')
    expect(label).toBeTruthy()

    items.forEach((item) => {
      const itemText = screen.getByText(item.name)
      expect(itemText).toBeTruthy()
      expect(screen.queryByTestId('check')).toBeNull()
    })
  })

  it('calls onValueChange and onBlur when value changes', () => {
    const onValueChange = jest.fn()
    const onBlur = jest.fn()
    render(<Select items={items} onValueChange={onValueChange} onBlur={onBlur} />)

    fireEvent(screen.getByTestId('trigger'), 'valueChange', 'Option 1')

    expect(onValueChange).toHaveBeenCalledWith('Option 1')
    expect(onBlur).toHaveBeenCalled()
  })
})
