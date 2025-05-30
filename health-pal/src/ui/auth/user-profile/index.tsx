import { Controller, useForm } from 'react-hook-form'

import { useRef } from 'react'
import { Keyboard, TextInput } from 'react-native'

import { useToastController } from '@tamagui/toast'

import { VALIDATIONS_MESSAGE } from '@app/constants/message'
import { EMAIL_REGEX } from '@app/constants/regex'

import { Button } from '@theme/button'
import { XStack, YStack } from '@theme/stack'

import { Input } from '@app/components'
import DateInput from '@app/components/date-input'
import FormKeyboardAvoidingView from '@app/components/form-keyboard-avoiding-view'
import Select from '@app/components/select'
import Upload from '@app/components/upload'
import { useSession } from '@app/contexts'
import { uploadToStrapi } from '@app/services/upload-image'
import { UserProfileData } from '@app/types'

interface UserProfileFormProps {
  defaultData?: Partial<UserProfileData>
  onSubmit: (data: UserProfileData) => Promise<void>
  editable?: boolean
}

const UserProfile = ({ defaultData, editable, onSubmit }: UserProfileFormProps) => {
  const nameRef = useRef<TextInput>(null)
  const nicknameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const toast = useToastController()

  const { session } = useSession()
  const jwt = session?.jwt

  const { control, handleSubmit, setError, setValue } = useForm<UserProfileData>({
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      gender: null,
      dateOfBirth: null,
      ...defaultData,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleSubmitProfile = async (data: UserProfileData) => {
    if (Keyboard.isVisible()) Keyboard.dismiss()
    await onSubmit(data)
  }

  return (
    <FormKeyboardAvoidingView>
      <YStack gap={24} paddingHorizontal={24} flex={1}>
        <YStack gap={20}>
          <XStack justifyContent="center">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange } }) => (
                <Upload
                  onUpload={async (image: string) => {
                    const { error, data } = await uploadToStrapi(image, jwt!)

                    if (error) {
                      toast.show('Upload Failed', {
                        message: error.message,
                        duration: 3000,
                        type: 'error',
                      })
                      return
                    }

                    const { url, id } = data

                    onChange(id)
                    setValue('avatarUrl', url)
                    nameRef.current?.focus()
                  }}
                  preview={defaultData?.avatarUrl}
                />
              )}
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
                placeholder="Name"
                ref={nameRef}
                returnKeyType="next"
                onEdited={(isChanged) => {
                  if (isChanged) nicknameRef?.current?.focus()
                }}
                onChangeText={onChange}
                errorMessage={error?.message}
                textContentType="name"
                editable={editable}
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
                returnKeyType="next"
                ref={nicknameRef}
                onEdited={(isChanged) => {
                  console.log('isChanged', isChanged)
                  if (isChanged) emailRef?.current?.focus()
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
                placeholder="Email"
                ref={emailRef}
                onChangeText={onChange}
                errorMessage={error?.message}
                editable={editable}
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
                onChangeValue={(value) => {
                  onChange(value)
                  setError('dateOfBirth', {})
                }}
                datePickerProps={{ maxDate: new Date() }}
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
                placeholder="Gender"
                items={GENDERS}
                onValueChange={onChange}
                value={value ?? ''}
                errorMessage={error?.message}
                native
              />
            )}
          />
        </YStack>
        <Button onPress={handleSubmit(handleSubmitProfile)}>Save</Button>
      </YStack>
    </FormKeyboardAvoidingView>
  )
}

export default UserProfile

const GENDERS = [{ name: 'Male' }, { name: 'Female' }]
