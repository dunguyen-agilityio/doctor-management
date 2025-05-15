import { Input } from '@app/components'
import DateInput from '@app/components/date-input'
import FormKeyboardAvoidingView from '@app/components/form-keyboard-avoiding-view'
import Select from '@app/components/select'
import Upload from '@app/components/upload'
import { Controller, useForm } from 'react-hook-form'

import { useRef } from 'react'
import { TextInput } from 'react-native'

import { VALIDATIONS_MESSAGE } from '@app/constants/message'
import { EMAIL_REGEX } from '@app/constants/regex'

import { Button } from '@theme/button'
import { XStack, YStack } from '@theme/stack'

type UserProfileFormData = {
  name: string
  nickname: string
  email: string
  dateOfBirth: Date | null
  gender: boolean | null
}

interface UserProfileFormProps {
  defaultData?: Partial<UserProfileFormData>
  onSubmit: (data: UserProfileFormData) => Promise<void>
}

const UserProfile = ({ defaultData, onSubmit }: UserProfileFormProps) => {
  const nameRef = useRef<TextInput>(null)
  const nicknameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<UserProfileFormData>({
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      gender: null,
      dateOfBirth: null,
      ...defaultData,
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })

  return (
    <FormKeyboardAvoidingView>
      <YStack gap={24} paddingHorizontal={24} flex={1}>
        <YStack gap={20}>
          <XStack justifyContent="center">
            <Upload
              onUpload={() => {
                nameRef.current?.focus()
              }}
            />
          </XStack>
          <Controller
            control={control}
            name="name"
            rules={{
              required: VALIDATIONS_MESSAGE.REQUIRED_FIELD('Name'),
              minLength: {
                value: 6,
                message: VALIDATIONS_MESSAGE.MIN('Name'),
              },
            }}
            render={({ field: { onChange, ...field }, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Michael Jordan"
                ref={nameRef}
                onEndEdit={(isChanged) => {
                  if (isChanged) nicknameRef?.current?.focus()
                }}
                onChangeText={onChange}
                errorMessage={error?.message}
                textContentType="name"
              />
            )}
          />
          <Controller
            control={control}
            name="nickname"
            rules={{
              required: VALIDATIONS_MESSAGE.REQUIRED_FIELD('Nickname'),
              minLength: {
                value: 6,
                message: VALIDATIONS_MESSAGE.MIN('Nickname'),
              },
            }}
            render={({ field: { onChange, ...field }, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Nickname"
                ref={nicknameRef}
                onEndEditing={({ nativeEvent }) => {
                  if (nativeEvent.text) emailRef?.current?.focus()
                }}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              required: VALIDATIONS_MESSAGE.REQUIRED_EMAIL,
              pattern: {
                value: EMAIL_REGEX,
                message: VALIDATIONS_MESSAGE.INVALID_EMAIL,
              },
            }}
            render={({ field: { onChange, ...field }, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="name@example.com"
                ref={emailRef}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{
              required: VALIDATIONS_MESSAGE.REQUIRED_FIELD('Date Of Birth'),
            }}
            render={({ field: { onChange, ...field }, fieldState: { error } }) => (
              <DateInput
                {...field}
                placeholder="Date of birth"
                onChangeValue={onChange}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            rules={{
              required: VALIDATIONS_MESSAGE.REQUIRED_FIELD('Gender'),
            }}
            render={({ field: { value, onChange, onBlur, ...field }, fieldState: { error } }) => (
              <Select
                {...field}
                label="Gender"
                placeholder="Gender"
                items={[{ name: 'Male' }, { name: 'Female' }]}
                native
                onValueChange={onChange}
                value={formatGender(value)}
                errorMessage={error?.message}
              />
            )}
          />
        </YStack>
        <Button onPress={handleSubmit(onSubmit)}>Save</Button>
      </YStack>
    </FormKeyboardAvoidingView>
  )
}

export default UserProfile

const formatGender = (value: boolean | null) => {
  if (value === null) return
  return value ? 'Male' : 'Female'
}
