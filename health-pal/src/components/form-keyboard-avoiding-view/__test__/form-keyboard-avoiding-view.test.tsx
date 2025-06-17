import { render } from '@utils-test'

import React from 'react'
import * as RN from 'react-native'

import FormKeyboardAvoidingView from '..'

const { Text } = RN

describe('FormKeyboardAvoidingView', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders children inside ScrollView and KeyboardAvoidingView', () => {
    const { getByText } = render(
      <FormKeyboardAvoidingView>
        <Text>Test Content</Text>
      </FormKeyboardAvoidingView>,
    )

    expect(getByText('Test Content')).toBeTruthy()
  })

  it('applies correct behavior based on platform', () => {
    const spy = jest.spyOn(RN, 'Platform', 'get')
    spy.mockReturnValue({ OS: 'ios' })

    const { UNSAFE_getByType } = render(
      <FormKeyboardAvoidingView>
        <Text>iOS Content</Text>
      </FormKeyboardAvoidingView>,
    )

    const keyboardView = UNSAFE_getByType(RN.KeyboardAvoidingView)
    expect(keyboardView.props.behavior).toBe('padding')
    expect(keyboardView.props.keyboardVerticalOffset).toBe(100)

    spy.mockRestore()
  })
})
