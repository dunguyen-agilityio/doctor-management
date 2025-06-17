import { act, fireEvent, render, screen, waitFor } from '@utils-test'

import React from 'react'
import { Keyboard } from 'react-native'

import { debounce } from 'tamagui'

import { VALIDATIONS_MESSAGE } from '@/constants'

import { queryClient } from '@react-query.config'

import LoginForm from '..'

jest.mock('tamagui', () => ({
  ...jest.requireActual('tamagui'),
  debounce: jest.fn(),
}))

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('renders email and password inputs correctly', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    expect(screen.getByPlaceholderText('Your Email')).toBeTruthy()
    expect(screen.getByPlaceholderText('Password')).toBeTruthy()
    expect(screen.getByText('Sign in')).toBeTruthy()
  })

  it('mock handle next field when submit', async () => {
    const mockHandle = jest.fn()
    ;(debounce as jest.Mock).mockReturnValue(mockHandle)
    const { getByLabelText } = render(<LoginForm onSubmit={mockOnSubmit} />)

    fireEvent(getByLabelText('Your Email'), 'onSubmitEditing')

    await waitFor(() => {
      expect(mockHandle).toHaveBeenNthCalledWith(1, { event: 'SUBMIT', next: 1 })
    })
  })

  it('mock handle next field when focus', async () => {
    const mockHandle = jest.fn()
    ;(debounce as jest.Mock).mockReturnValue(mockHandle)
    const { getByLabelText } = render(<LoginForm onSubmit={mockOnSubmit} />)

    fireEvent(getByLabelText('Password'), 'onFocus')

    await waitFor(() => {
      expect(mockHandle).toHaveBeenNthCalledWith(1, { event: 'FOCUS' })
    })
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const signInButton = screen.getByText('Sign in')
    act(() => {
      fireEvent.press(signInButton)
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATIONS_MESSAGE.REQUIRED_EMAIL)).toBeTruthy()
      expect(screen.getByText(VALIDATIONS_MESSAGE.REQUIRED_PASSWORD)).toBeTruthy()
    })
  })

  it('shows validation error for invalid email', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByPlaceholderText('Your Email')
    fireEvent.changeText(emailInput, 'invalid-email')
    fireEvent(emailInput, 'blur')

    await waitFor(() => {
      expect(screen.getByText(VALIDATIONS_MESSAGE.INVALID_EMAIL)).toBeTruthy()
    })
  })

  it('submits form with valid data and dismisses keyboard', async () => {
    ;(Keyboard.isVisible as jest.Mock).mockReturnValue(true)
    render(<LoginForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByPlaceholderText('Your Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const signInButton = screen.getByText('Sign in')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(signInButton)

    await waitFor(() => {
      expect(Keyboard.dismiss).toHaveBeenCalled()
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })
})
