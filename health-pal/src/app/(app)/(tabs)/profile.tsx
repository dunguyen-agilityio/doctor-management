import { YStack } from '@theme/stack'
import { Text } from '@theme/text'

import { useSession } from '@app/contexts'

const Profile = () => {
  const { signOut } = useSession()

  return (
    <YStack>
      <Text onPress={signOut}>Logout</Text>
    </YStack>
  )
}

export default Profile
