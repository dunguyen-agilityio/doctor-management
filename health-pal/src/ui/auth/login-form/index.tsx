import { Controller, useForm } from 'react-hook-form'

import { useRef } from 'react'
import { Keyboard, TextInput } from 'react-native'

import { YStack } from 'tamagui'

import { EMAIL_REGEX } from '@app/constants'
import { VALIDATIONS_MESSAGE } from '@app/constants/message'

import { Button } from '@theme/button'

import { LockIcon, SmsIcon } from '@icons'

import { Input } from '@app/components'
import { AuthCredentials } from '@app/types'

interface LoginFormProps {
  onSubmit: (data: AuthCredentials) => Promise<void>
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const passwordRef = useRef<TextInput>(null)

  const { control, handleSubmit, formState } = useForm<AuthCredentials>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleLogin = async (data: AuthCredentials) => {
    if (Keyboard.isVisible()) Keyboard.dismiss()
    await onSubmit(data)
  }

  const disabled =
    !!Object.keys(formState.errors).length ||
    !Object.values(formState.dirtyFields).every((value) => value)

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
                onChangeText={onChange}
                leftIcon={SmsIcon}
                placeholder="Your Email"
                errorMessage={error?.message}
                textContentType="emailAddress"
                returnKeyType="next"
                onEndEdit={(isChanged) => {
                  if (isChanged) {
                    passwordRef.current?.focus()
                  }
                }}
              />
            )
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: VALIDATIONS_MESSAGE.REQUIRED_PASSWORD }}
          render={({ field: { onChange, ...field }, fieldState: { error } }) => (
            <Input
              {...field}
              onChangeText={onChange}
              ref={passwordRef}
              leftIcon={LockIcon}
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              errorMessage={error?.message}
              returnKeyType="done"
            />
          )}
        />
      </YStack>
      <Button onPress={handleSubmit(handleLogin)} disabled={disabled} marginTop={24}>
        Sign in
      </Button>
    </YStack>
  )
}

export default LoginForm
