import { SmsIcon } from '@/icons'
import User from '@/icons/user'
import { Controller, useForm } from 'react-hook-form'

import { Keyboard } from 'react-native'

import { YStack } from 'tamagui'

import { VALIDATIONS_MESSAGE } from '@/constants/message'
import { EMAIL_REGEX } from '@/constants/regex'

import useAutoFocusField from '@/hooks/use-auto-focus-field'

import { PasswordInput } from '@/components'
import { Button, Input } from '@/components/common'

import { SignupData } from '@/types'

interface SignupFormProps {
  onSubmit: (data: SignupData) => Promise<void>
  defaultValues?: Partial<SignupData>
}

const SignupForm = ({
  onSubmit,
  defaultValues = { email: '', name: '', password: '' },
}: SignupFormProps) => {
  const [inputRefs, handleField] = useAutoFocusField()

  const { control, handleSubmit } = useForm<SignupData>({
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleSignup = async (data: SignupData) => {
    if (Keyboard.isVisible()) Keyboard.dismiss()
    await onSubmit(data)
  }

  const handleFocus = () => {
    handleField({ event: 'FOCUS' })
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
              errorMessage={error?.message}
              onSubmitEditing={() => {
                handleField({ event: 'SUBMIT', next: 1 })
              }}
              onChangeText={onChange}
              onFocus={handleFocus}
              returnKeyType="next"
              aria-label="Full Name"
              accessibilityHint="Enter your full name"
              accessibilityRole="text"
              ref={(el) => void (inputRefs.current[0] = el)}
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
              errorMessage={error?.message}
              ref={(el) => void (inputRefs.current[1] = el)}
              onSubmitEditing={() => {
                handleField({ event: 'SUBMIT', next: 2 })
              }}
              onChangeText={onChange}
              onFocus={handleFocus}
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
              errorMessage={error?.message}
              ref={(el) => void (inputRefs.current[2] = el)}
              onSubmitEditing={(e) => {}}
              onChangeText={onChange}
              onFocus={handleFocus}
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
