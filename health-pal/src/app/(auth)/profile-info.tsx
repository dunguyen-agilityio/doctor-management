import { SignupFormData } from '@app/types'
import UserProfile from '@app/ui/auth/user-profile'

import { useLocalSearchParams } from 'expo-router'

const Profile = () => {
  const params = useLocalSearchParams<SignupFormData>()

  return (
    <UserProfile
      onSubmit={async (data) => {
        console.log('data', data)
      }}
      defaultData={params}
    />
  )
}

export default Profile
