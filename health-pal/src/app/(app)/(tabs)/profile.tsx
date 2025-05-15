import { useSession } from '@app/contexts'

import { YStack } from '@theme/stack'
import { Text } from '@theme/text'

const Profile = () => {
  const { signOut } = useSession()

  return (
    <YStack>
      <Text onPress={signOut}>Logout</Text>
    </YStack>
  )
}

export default Profile
