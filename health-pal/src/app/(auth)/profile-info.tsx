import { useRef } from 'react'

import { router } from 'expo-router'

import { useToastController } from '@tamagui/toast'

import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { register, updateProfile } from '@app/services/auth'
import { UserProfileData } from '@app/types'
import { ModalRef } from '@app/types/modal'
import { CreateAccountSuccessModal } from '@app/ui/auth'
import UserProfile from '@app/ui/auth/user-profile'

const Profile = () => {
  const { session } = useSession()

  const setAppLoading = useAppLoading()
  const { signIn, setUser } = useSession()
  const createSuccessModalRef = useRef<ModalRef>(null)
  const toast = useToastController()

  const { jwt, user } = session ?? {}

  const {
    gender,
    nickname,
    dateOfBirth,
    username,
    name,
    email,
    avatar,
    id: userId,
    password,
  } = user ?? {}

  const isSignup = session && !session?.jwt

  const handleSignup = async (formData: UserProfileData) => {
    createSuccessModalRef.current?.open()

    const { data, error } = await register({ ...formData, password: password! })

    if (data) {
      toast.show('Signup Successful', {
        message: 'Account created!',
        type: 'success',
        duration: 3000,
      })
      setAppLoading(true)
      router.replace('/(app)/(tabs)')
      signIn(data)
    } else {
      toast.show('Signup Failed', {
        message: error.message,
        type: 'error',
        duration: 3000,
      })
    }

    setAppLoading(false)
    createSuccessModalRef.current?.close()
  }

  const handleEditProfile = async (formData: UserProfileData) => {
    if (!userId || !jwt) return

    setAppLoading(true)
    const { data, error } = await updateProfile({ ...formData, id: userId }, jwt)

    if (data) {
      setUser(data)
      toast.show('Profile Updated', {
        message: 'Profile updated successfully!',
        type: 'success',
        duration: 3000,
      })
    } else {
      toast.show('Profile Update Failed', {
        message: error.message,
        type: 'error',
        duration: 3000,
      })
    }

    setAppLoading(false)
    router.back()
  }

  return (
    <>
      {isSignup && <CreateAccountSuccessModal ref={createSuccessModalRef} />}
      <UserProfile
        onSubmit={isSignup ? handleSignup : handleEditProfile}
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
    </>
  )
}

export default Profile
