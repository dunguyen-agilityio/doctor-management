// __tests__/DatePicker.test.tsx
import { createDayjs } from '@/utils/date'
import { act, fireEvent, render, screen } from '@utils-test'

// Adjust path to your DatePicker component

import DatePicker from '..'

describe('DatePicker', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders match snapshot', () => {
    const tree = render(<DatePicker onChange={mockOnChange} />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it.skip('calls onChange with selected date when a date is picked', () => {
    render(<DatePicker onChange={mockOnChange} timeZone="Asia/Tokyo" />)

    const dateCell = screen.getByText('23')
    act(() => {
      fireEvent.press(dateCell)
    })

    const date = new Date()

    date.setDate(23)

    expect(mockOnChange).toHaveBeenCalledWith(createDayjs(date).toDate())
  })
})
