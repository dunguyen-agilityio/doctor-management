import { Controller, useForm } from 'react-hook-form'

import { useRef } from 'react'
import { Keyboard, TextInput } from 'react-native'

import { YStack } from 'tamagui'

import { VALIDATIONS_MESSAGE } from '@app/constants/message'
import { EMAIL_REGEX } from '@app/constants/regex'

import { PasswordInput } from '@app/components'
import { Button, Input } from '@app/components/common'

import { SmsIcon } from '@icons'
import User from '@icons/user'

import { SignupData } from '@app/types'

interface SignupFormProps {
  onSubmit: (data: SignupData) => Promise<void>
  defaultValues?: Partial<SignupData>
}

const SignupForm = ({
  onSubmit,
  defaultValues = { email: '', name: '', password: '' },
}: SignupFormProps) => {
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<SignupData>({
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleSignup = async (data: SignupData) => {
    if (Keyboard.isVisible()) Keyboard.dismiss()
    await onSubmit(data)
  }

  const handleEndEditName = (isChanged: boolean) => {
    isChanged && emailRef?.current?.focus()
  }

  const handleEndEditEmail = (isChanged: boolean) => {
    isChanged && passwordRef?.current?.focus()
  }

  return (
    <YStack gap={24}>
      <YStack gap={20}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: VALIDATIONS_MESSAGE.REQUIRED_NAME,
            minLength: {
              value: 6,
              message: VALIDATIONS_MESSAGE.MIN('Name'),
            },
          }}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <Input
              {...field}
              leftIcon={User}
              placeholder="Your Name"
              onChangeText={onChange}
              errorMessage={error?.message}
              onEdited={handleEndEditName}
              returnKeyType="next"
              aria-label="Full Name"
              accessibilityHint="Enter your full name"
              accessibilityRole="text"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: VALIDATIONS_MESSAGE.REQUIRED_FIELD('Email'),
            pattern: {
              value: EMAIL_REGEX,
              message: VALIDATIONS_MESSAGE.INVALID_EMAIL,
            },
          }}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <Input
              {...field}
              leftIcon={SmsIcon}
              placeholder="Your Email"
              onChangeText={onChange}
              errorMessage={error?.message}
              ref={emailRef}
              onEdited={handleEndEditEmail}
              returnKeyType="next"
              textContentType="emailAddress"
              aria-label="Your Email"
              accessibilityHint="Enter your email address"
              accessibilityRole="text"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: VALIDATIONS_MESSAGE.REQUIRED_PASSWORD,
            minLength: {
              value: 6,
              message: VALIDATIONS_MESSAGE.MIN('Password'),
            },
          }}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              onChangeText={onChange}
              errorMessage={error?.message}
              ref={passwordRef}
              returnKeyType="done"
              aria-label="Password"
              accessibilityHint="Enter your password"
              accessibilityRole="text"
            />
          )}
        />
      </YStack>
      <Button
        onPress={handleSubmit(handleSignup)}
        role="button"
        aria-label="Create Account"
        accessibilityHint="Submits the form to create a new account">
        Create Account
      </Button>
    </YStack>
  )
}

export default SignupForm
