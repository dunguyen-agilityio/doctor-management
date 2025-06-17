import { SmsIcon } from '@/icons'
import { Controller, useForm } from 'react-hook-form'

import { Keyboard } from 'react-native'

import { YStack } from 'tamagui'

import { EMAIL_REGEX } from '@/constants'
import { VALIDATIONS_MESSAGE } from '@/constants/message'

import { useAutoFocusField } from '@/hooks/use-auto-focus-field'

import { Button, Input, PasswordInput } from '@/components'

import { AuthCredentials } from '@/types'

interface LoginFormProps {
  onSubmit: (data: AuthCredentials) => Promise<void>
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [inputRefs, handleField] = useAutoFocusField()

  const { control, handleSubmit, formState } = useForm<AuthCredentials>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })

  const handleLogin = async (data: AuthCredentials) => {
    if (Keyboard.isVisible()) Keyboard.dismiss()
    await onSubmit(data)
  }

  const disabled =
    !!Object.keys(formState.errors).length ||
    !Object.values(formState.dirtyFields).every((value) => value)

  const handleFocus = () => {
    handleField({ event: 'FOCUS' })
  }

  return (
    <YStack>
      <YStack gap={20}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: VALIDATIONS_MESSAGE.REQUIRED_EMAIL,
            pattern: { value: EMAIL_REGEX, message: VALIDATIONS_MESSAGE.INVALID_EMAIL },
          }}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => {
            return (
              <Input
                {...field}
                leftIcon={SmsIcon}
                placeholder="Your Email"
                errorMessage={error?.message}
                textContentType="emailAddress"
                aria-label="Your Email"
                accessibilityHint="Enter your email address"
                accessibilityRole="text"
                autoCapitalize="none"
                returnKeyType="next"
                ref={(el) => void (inputRefs.current[0] = el)}
                onSubmitEditing={() => {
                  handleField({ event: 'SUBMIT', next: 1 })
                }}
                onChangeText={onChange}
                onFocus={handleFocus}
              />
            )
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: VALIDATIONS_MESSAGE.REQUIRED_PASSWORD }}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              ref={(el) => void (inputRefs.current[1] = el)}
              onChangeText={onChange}
              onFocus={handleFocus}
              errorMessage={error?.message}
              returnKeyType="done"
              aria-label="Password"
              accessibilityHint="Enter your password"
              accessibilityRole="text"
            />
          )}
        />
      </YStack>
      <Button
        onPress={handleSubmit(handleLogin)}
        disabled={disabled}
        marginTop={24}
        aria-label="Sign in"
        accessibilityHint="Submits your login credentials">
        Sign in
      </Button>
    </YStack>
  )
}

export default LoginForm
