// __tests__/use-auto-focus-field.test.tsx
import { act, renderHook } from '@utils-test'

import { TextInput } from 'react-native'

import { useAutoFocusField } from '../use-auto-focus-field'

describe('useAutoFocusField', () => {
  it('should focus the next input on SUBMIT event', () => {
    const mockFocus1 = jest.fn()
    const mockFocus2 = jest.fn()
    jest.useFakeTimers()

    const { result } = renderHook(() => useAutoFocusField())
    const [inputRefs, handle] = result.current

    // Simulate refs
    inputRefs.current = [
      { focus: mockFocus1 } as unknown as TextInput,
      { focus: mockFocus2 } as unknown as TextInput,
    ]

    act(() => {
      handle({ event: 'SUBMIT', next: 1 })
    })
    jest.advanceTimersByTime(500)

    expect(mockFocus2).toHaveBeenCalled()
    expect(mockFocus1).not.toHaveBeenCalled()
  })

  it('should not call focus if next index is invalid', () => {
    const mockFocus = jest.fn()
    jest.useFakeTimers()
    const { result } = renderHook(() => useAutoFocusField())
    const [inputRefs, handle] = result.current

    inputRefs.current = [{ focus: mockFocus } as unknown as TextInput]

    act(() => {
      handle({ event: 'SUBMIT', next: 10 }) // out of bounds
    })
    jest.advanceTimersByTime(500)

    expect(mockFocus).not.toHaveBeenCalled()
  })
})
