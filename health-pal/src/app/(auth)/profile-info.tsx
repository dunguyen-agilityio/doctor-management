import { useRef } from 'react'

import { router } from 'expo-router'

import { useToastController } from '@tamagui/toast'

import { ROUTES } from '@/constants'

import { useAppLoading } from '@/hooks'
import { useSession } from '@/hooks/use-session'

import { CreateAccountSuccessModal } from '@/ui/auth'
import UserProfile from '@/ui/auth/user-profile'

import { register } from '@/services/auth'

import { UserProfileData } from '@/types'
import { ModalRef } from '@/types/modal'

const Profile = () => {
  const setAppLoading = useAppLoading()
  const { signIn, session } = useSession()
  const createSuccessModalRef = useRef<ModalRef>(null)
  const toast = useToastController()

  const { gender, nickname, dateOfBirth, username, name, email, avatar, password } =
    session.user ?? {}

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
      router.replace(ROUTES.HOME)
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

  return (
    <>
      <CreateAccountSuccessModal ref={createSuccessModalRef} />
      <UserProfile
        onSubmit={handleSignup}
        defaultData={{
          dateOfBirth,
          name: name ?? username,
          email,
          gender: gender ? 'Male' : 'Female',
          avatarUrl: avatar?.url,
          nickname,
        }}
        editable
      />
    </>
  )
}

export default Profile
