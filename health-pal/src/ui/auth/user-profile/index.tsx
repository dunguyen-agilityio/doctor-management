import { Controller, useForm } from 'react-hook-form'

import { useRef } from 'react'
import { Keyboard, TextInput } from 'react-native'

import dayjs from 'dayjs'

import { useToastController } from '@tamagui/toast'

import { VALIDATIONS_MESSAGE } from '@app/constants/message'
import { EMAIL_REGEX } from '@app/constants/regex'

import { useAppLoading } from '@app/hooks'

import {
  Button,
  DateInput,
  FormKeyboardAvoidingView,
  Input,
  Select,
  Upload,
  XStack,
  YStack,
} from '@app/components'

import { uploadToStrapi } from '@app/services/upload-image'

import { UserProfileData } from '@app/types'

import { getMaxDate } from '@app/utils/date'

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

  const setAppLoading = useAppLoading()

  const { control, handleSubmit, formState, setError, setValue } = useForm<UserProfileData>({
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

  const disabled = !formState.isDirty || Object.keys(formState.errors).length > 1

  return (
    <XStack flex={1}>
      <FormKeyboardAvoidingView
        aria-label="Profile form"
        accessibilityHint="Enter your profile information"
        role="form">
        <YStack gap={24} paddingHorizontal={24} flex={1}>
          <YStack gap={20}>
            <XStack justifyContent="center">
              <Controller
                control={control}
                name="avatar"
                render={({ field: { onChange } }) => (
                  <Upload
                    aria-label="Upload profile picture"
                    accessibilityHint="Opens image picker to update your profile picture"
                    role="button"
                    onUpload={async (image: string) => {
                      setAppLoading(true)
                      const { error, data } = await uploadToStrapi(image)

                      if (error) {
                        toast.show('Upload Failed', {
                          message: error.message,
                          duration: 3000,
                          type: 'error',
                        })
                        setAppLoading(false)
                        return
                      }

                      const { url, id } = data

                      onChange(id)
                      setValue('avatarUrl', url)
                      nameRef.current?.focus()
                      setAppLoading(false)
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
                  aria-label="Full name"
                  accessibilityHint="Enter your full name for your profile"
                  accessibilityRole="text"
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
                    if (isChanged) emailRef?.current?.focus()
                  }}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                  aria-label="Nickname"
                  accessibilityHint="Enter your nickname for your profile"
                  accessibilityRole="text"
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
                  aria-label="Email address"
                  accessibilityHint="Enter your email address for your profile"
                  accessibilityRole="text"
                />
              )}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                required: VALIDATIONS_MESSAGE.REQUIRED_FIELD('Date Of Birth'),
                validate: (val) => {
                  if (val === null) return VALIDATIONS_MESSAGE.REQUIRED_FIELD('Date Of Birth')
                  const maxDate = getMaxDate(16)
                  return dayjs(val).isBefore(maxDate, 'day') || VALIDATIONS_MESSAGE.DAY_OF_BIRTH()
                },
              }}
              render={({ field: { onChange, ...field }, fieldState: { error } }) => (
                <DateInput
                  {...field}
                  placeholder="Date of birth"
                  onChangeValue={(value) => {
                    onChange(value)
                    field.onBlur()
                    setError('dateOfBirth', {})
                  }}
                  datePickerProps={{ maxDate: dayjs() }}
                  errorMessage={error?.message}
                  aria-label="Date of birth"
                  accessibilityHint="Select your date of birth for your profile"
                  accessibilityRole="text"
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
                  aria-label="Gender"
                  accessibilityHint="Select your gender for your profile"
                />
              )}
            />
          </YStack>
          <Button
            onPress={handleSubmit(handleSubmitProfile)}
            aria-label="Save profile"
            disabled={disabled}
            accessibilityHint="Submits your profile information">
            Save
          </Button>
        </YStack>
      </FormKeyboardAvoidingView>
    </XStack>
  )
}

export default UserProfile

const GENDERS = [{ name: 'Male' }, { name: 'Female' }]
