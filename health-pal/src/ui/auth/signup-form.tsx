import { Input } from '@app/components'
import { SignupFormData } from '@app/types'
import { Controller, useForm } from 'react-hook-form'

import { useRef } from 'react'
import { TextInput } from 'react-native'

import { YStack } from 'tamagui'

import { VALIDATIONS_MESSAGE } from '@app/constants/message'
import { EMAIL_REGEX } from '@app/constants/regex'

import { Button } from '@theme/button'

import { LockIcon, SmsIcon } from '@icons/index'
import User from '@icons/user'

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<SignupFormData>({
    defaultValues: { email: '', name: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })

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
              onEndEdit={handleEndEditName}
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
              onEndEdit={handleEndEditEmail}
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
            <Input
              {...field}
              leftIcon={LockIcon}
              placeholder="Password"
              textContentType="password"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={error?.message}
              ref={passwordRef}
            />
          )}
        />
      </YStack>
      <Button onPress={handleSubmit(onSubmit)}>Create Account</Button>
    </YStack>
  )
}

export default SignupForm
