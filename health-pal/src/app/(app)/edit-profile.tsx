import { router } from 'expo-router'

import { useToastController } from '@tamagui/toast'

import { ROUTES } from '@/constants'

import { useAppLoading } from '@/hooks'
import { useRequireAuth } from '@/hooks/use-require-auth'

import { FormKeyboardAvoidingView } from '@/components'

import UserProfile from '@/ui/auth/user-profile'

import { updateProfile } from '@/services/auth'

import { UserProfileData } from '@/types'

const EditProfile = () => {
  const setAppLoading = useAppLoading()
  const { setUser, session } = useRequireAuth()

  const toast = useToastController()

  const { gender, nickname, dateOfBirth, username, name, email, avatar, id: userId } = session.user

  const isSignup = session.user && !session.isAuthenticated

  const handleEditProfile = async (formData: UserProfileData) => {
    setAppLoading(true)
    const { data, error } = await updateProfile({ ...formData, id: userId })

    if (data) {
      setUser(data)
      toast.show('Profile Updated', {
        message: 'Profile updated successfully!',
        type: 'success',
        duration: 3000,
      })
      router.navigate(ROUTES.PROFILE)
    } else {
      toast.show('Profile Update Failed', {
        message: error.message,
        type: 'error',
        duration: 3000,
      })
    }

    setAppLoading(false)
  }

  return (
    <FormKeyboardAvoidingView>
      <UserProfile
        onSubmit={handleEditProfile}
        defaultData={{
          dateOfBirth,
          name: name ?? username,
          email,
          gender: gender ? 'Male' : 'Female',
          avatarUrl: avatar?.url,
          nickname,
        }}
        editable={!isSignup}
      />
    </FormKeyboardAvoidingView>
  )
}

export default EditProfile
