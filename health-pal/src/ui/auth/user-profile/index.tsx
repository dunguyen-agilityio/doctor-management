import { getMaxDate } from '@/utils/date'
import { Controller, useForm } from 'react-hook-form'

import { Keyboard } from 'react-native'

import dayjs from 'dayjs'

import { useToastController } from '@tamagui/toast'

import { VALIDATIONS_MESSAGE } from '@/constants/message'
import { EMAIL_REGEX } from '@/constants/regex'

import { useAppLoading } from '@/hooks'
import useAutoFocusField from '@/hooks/use-auto-focus-field'

import {
  Button,
  DateInput,
  FormKeyboardAvoidingView,
  Input,
  Select,
  Upload,
  XStack,
  YStack,
} from '@/components'

import { uploadToStrapi } from '@/services/upload-image'

import { UserProfileData } from '@/types'

interface UserProfileFormProps {
  defaultData?: Partial<UserProfileData>
  onSubmit: (data: UserProfileData) => Promise<void>
  editable?: boolean
}

const UserProfile = ({ defaultData, editable, onSubmit }: UserProfileFormProps) => {
  const [inputRefs, handleField] = useAutoFocusField()
  const toast = useToastController()

  const setAppLoading = useAppLoading()

  const { control, handleSubmit, watch, formState, setError, setValue } = useForm<UserProfileData>({
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

  const handleFocus = () => {
    handleField({ event: 'FOCUS' })
  }

  const {
    avatarUrl: defaultAvatar,
    name: defaultName,
    email: defaultEmail,
    gender: defaultGender,
    nickname: defaultNickname,
    dateOfBirth: defaultDateOfBirth,
  } = defaultData ?? {}

  const isChanged =
    watch('avatarUrl') !== defaultAvatar ||
    watch('name') !== defaultName ||
    defaultEmail !== watch('email') ||
    !dayjs(watch('dateOfBirth')).isSame(defaultDateOfBirth) ||
    watch('nickname') !== defaultNickname ||
    watch('gender') !== defaultGender

  const disabled = !isChanged || Object.keys(formState.errors).length > 1

  return (
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
                  onOpenCamera={() => {
                    if (Keyboard.isVisible()) {
                      Keyboard.dismiss()
                    }
                  }}
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
                    handleField({ event: 'SUBMIT', next: 0 })
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
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Name"
                ref={(el) => void (inputRefs.current[0] = el)}
                returnKeyType="next"
                onSubmitEditing={(e) => {
                  handleField({ event: 'SUBMIT', next: 1 })
                }}
                onEndEditing={({ nativeEvent: { text } }) => onChange(text)}
                onFocus={handleFocus}
                onChangeText={() => {
                  setError('name', {})
                }}
                defaultValue={value}
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
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Nickname"
                returnKeyType="next"
                onChangeText={onChange}
                onFocus={handleFocus}
                ref={(el) => void (inputRefs.current[1] = el)}
                defaultValue={value}
                onSubmitEditing={() => {
                  handleField({ event: 'SUBMIT', next: 2 })
                }}
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
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
              <Input
                {...field}
                placeholder="Email"
                ref={(el) => void (inputRefs.current[2] = el)}
                defaultValue={value}
                onFocus={handleFocus}
                onChangeText={onChange}
                onSubmitEditing={() => {
                  handleField({ event: 'SUBMIT', next: 3 })
                }}
                errorMessage={error?.message}
                editable={editable}
                aria-label="Email address"
                accessibilityHint="Enter your email address for your profile"
                accessibilityRole="text"
                returnKeyType="next"
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
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
              <DateInput
                {...field}
                placeholder="Date of birth"
                onChangeValue={(value) => {
                  onChange(value)
                  setError('dateOfBirth', {})
                }}
                defaultValue={value}
                ref={(el) => void (inputRefs.current[3] = el)}
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
  )
}

export default UserProfile

const GENDERS = [{ name: 'Male' }, { name: 'Female' }]
