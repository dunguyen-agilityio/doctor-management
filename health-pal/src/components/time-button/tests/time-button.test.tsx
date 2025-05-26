import { act, fireEvent, render, screen } from '@utils-test'

import TimeButton from '..'

describe('TimeButton', () => {
  const mockValue = '14:30'
  const mockOnSelect = jest.fn()
  const mockFormattedTime = '14.30 PM'

  it('matches snapshot', () => {
    const { toJSON } = render(<TimeButton value={mockValue} onSelect={mockOnSelect} />)

    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onSelect with value when pressed', () => {
    render(<TimeButton value={mockValue} onSelect={mockOnSelect} />)

    act(() => {
      fireEvent.press(screen.getByText(mockFormattedTime))
    })

    expect(mockOnSelect).toHaveBeenCalledWith(mockValue)
  })
})
