import { useRef } from 'react'

import { router, useLocalSearchParams } from 'expo-router'

import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { register } from '@app/services/auth'
import { SignupData, UserProfileData } from '@app/types'
import { ModalRef } from '@app/types/modal'
import { CreateAccountSuccessModal } from '@app/ui/auth/create-account-success-modal'
import UserProfile from '@app/ui/auth/user-profile'

const Profile = () => {
  const params = useLocalSearchParams<SignupData>()
  const setAppLoading = useAppLoading()
  const { signIn } = useSession()
  const createSuccessModalRef = useRef<ModalRef>(null)

  const handleSubmit = async (formData: UserProfileData) => {
    createSuccessModalRef.current?.open()
    const { data, error } = await register(formData)

    if (data) {
      setAppLoading(true)
      router.replace('/(app)/(tabs)')
      signIn(data)
      createSuccessModalRef.current?.open()
      return
    }

    setAppLoading(false)
    // TODO: Show toast message
    console.log('error :>> ', error)
  }

  return (
    <>
      <CreateAccountSuccessModal ref={createSuccessModalRef} />
      <UserProfile onSubmit={handleSubmit} defaultData={params} />
    </>
  )
}

export default Profile
