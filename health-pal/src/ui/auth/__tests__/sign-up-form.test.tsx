import { act, fireEvent, render, screen, waitFor } from '@utils-test'

import React from 'react'
import { Keyboard } from 'react-native'

import { VALIDATIONS_MESSAGE } from '@/constants'

import { queryClient } from '@react-query.config'

import SignupForm from '../signup-form'

describe('SignupForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('renders name, email, and password inputs correctly', () => {
    render(<SignupForm onSubmit={mockOnSubmit} />)

    expect(screen.getByPlaceholderText('Your Name')).toBeTruthy()
    expect(screen.getByPlaceholderText('Your Email')).toBeTruthy()
    expect(screen.getByPlaceholderText('Password')).toBeTruthy()
    expect(screen.getByText('Create Account')).toBeTruthy()
  })

  it('shows validation errors for empty fields', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />)

    const createAccountButton = screen.getByText('Create Account')
    act(() => {
      fireEvent.press(createAccountButton)
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATIONS_MESSAGE.REQUIRED_NAME)).toBeTruthy()
      expect(screen.getByText(VALIDATIONS_MESSAGE.REQUIRED_FIELD('Email'))).toBeTruthy()
      expect(screen.getByText(VALIDATIONS_MESSAGE.REQUIRED_PASSWORD)).toBeTruthy()
    })
  })

  it('shows validation error for invalid email', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByPlaceholderText('Your Email')
    fireEvent.changeText(emailInput, 'invalid-email')
    fireEvent(emailInput, 'blur')

    await waitFor(() => {
      expect(screen.getByText(VALIDATIONS_MESSAGE.INVALID_EMAIL)).toBeTruthy()
    })
  })

  it('shows validation error for name less than 6 characters', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    fireEvent.changeText(nameInput, 'short')
    fireEvent(nameInput, 'blur')

    await waitFor(() => {
      expect(screen.getByText(VALIDATIONS_MESSAGE.MIN('Name'))).toBeTruthy()
    })
  })

  it('shows validation error for password less than 6 characters', async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />)

    const passwordInput = screen.getByPlaceholderText('Password')
    fireEvent.changeText(passwordInput, 'short')
    fireEvent(passwordInput, 'blur')

    await waitFor(() => {
      expect(screen.getByText(VALIDATIONS_MESSAGE.MIN('Password'))).toBeTruthy()
    })
  })

  it('submits form with valid data and dismisses keyboard', async () => {
    ;(Keyboard.isVisible as jest.Mock).mockReturnValue(true)
    render(<SignupForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('Your Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const createAccountButton = screen.getByText('Create Account')

    fireEvent.changeText(nameInput, 'John Doe')
    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(createAccountButton)

    await waitFor(() => {
      expect(Keyboard.dismiss).toHaveBeenCalled()
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it.skip('focuses email input after valid name submission', async () => {
    const emailInputRef = { current: { focus: jest.fn() } }
    jest.spyOn(React, 'useRef').mockImplementation((initialValue) => {
      if (initialValue === null && !jest.isMockFunction(initialValue?.focus)) {
        return emailInputRef
      }
      return { current: initialValue }
    })

    render(<SignupForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    fireEvent.changeText(nameInput, 'John Doe')
    fireEvent(nameInput, 'submitEditing')

    await waitFor(() => {
      expect(emailInputRef.current.focus).toHaveBeenCalled()
    })
  })

  it.skip('focuses password input after valid email submission', async () => {
    const passwordInputRef = { current: { focus: jest.fn() } }
    jest.spyOn(React, 'useRef').mockImplementation((initialValue) => {
      if (initialValue === null && !jest.isMockFunction(initialValue?.focus)) {
        return passwordInputRef
      }
      return { current: initialValue }
    })

    render(<SignupForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByPlaceholderText('Your Email')
    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent(emailInput, 'submitEditing')

    await waitFor(() => {
      expect(passwordInputRef.current.focus).toHaveBeenCalled()
    })
  })

  it('handles default values correctly', () => {
    const defaultValues = { name: 'Jane Doe', email: 'jane@example.com', password: '' }
    render(<SignupForm onSubmit={mockOnSubmit} defaultValues={defaultValues} />)

    expect(screen.getByPlaceholderText('Your Name')).toHaveProp('value', 'Jane Doe')
    expect(screen.getByPlaceholderText('Your Email')).toHaveProp('value', 'jane@example.com')
    expect(screen.getByPlaceholderText('Password')).toHaveProp('value', '')
  })
})
