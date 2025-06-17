import { act, fireEvent, render } from '@utils-test'

import React, { createRef } from 'react'

import DateInput from '..'

describe('DateInput', () => {
  const setup = (props = {}) => {
    return render(<DateInput {...props} />)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('match snapshot', () => {
    const date = new Date(2025, 0, 1)
    const { toJSON } = setup({ value: date })
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders with formatted initial value', () => {
    const date = new Date(2025, 0, 1)
    const { getByLabelText } = setup({ value: date })
    expect(getByLabelText('Select date').props.defaultValue).toBe('01/01/2025')
  })

  it('shows date picker when clicked', async () => {
    const { getByTestId } = setup()
    act(() => {
      fireEvent.press(getByTestId('trigger-input'))
    })
    expect(getByTestId('calendar')).toBeTruthy()
  })

  it('displays error message when provided', () => {
    const { getByText } = setup({ errorMessage: 'Invalid date' })
    expect(getByText('Invalid date')).toBeTruthy()
  })

  it('input is non-editable and pointerEvents="none"', () => {
    const { getByLabelText } = setup()
    const input = getByLabelText('Select date')
    expect(input.props.editable).toBe(false)
    expect(input.props.pointerEvents).toBe('none')
  })

  it('supports imperative focus with ref', () => {
    const ref = createRef<any>()
    const { getByTestId } = render(<DateInput ref={ref} />)

    act(() => {
      ref.current?.focus()
    })

    expect(getByTestId('calendar')).toBeTruthy()
  })
})
