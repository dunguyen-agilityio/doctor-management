import { useRef } from 'react'

import { router } from 'expo-router'

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
      setAppLoading(true)
      router.replace('/(app)/(tabs)')
      signIn(data)
      createSuccessModalRef.current?.open()
      return
    }

    setAppLoading(false)
    // TODO: Show toast message
    console.log('error', error)
    createSuccessModalRef.current?.close()
  }

  const handleEditProfile = async (formData: UserProfileData) => {
    if (!userId || !jwt) return

    setAppLoading(true)
    const { data, error } = await updateProfile({ ...formData, id: userId }, jwt)

    if (data) {
      setUser(data)
    } else {
      console.log(error)
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
          avatar: avatar?.url,
          nickname,
        }}
        editable={!isSignup}
      />
    </>
  )
}

export default Profile
