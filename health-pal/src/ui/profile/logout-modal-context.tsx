import { Separator } from 'tamagui'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import { SheetModal } from '@app/components/sheet-modal'
import { useSession } from '@app/contexts'
import { queryClient } from '@app/react-query.config'
import { ModalRef } from '@app/types/modal'

const LogoutModalContext = ({ ref }: { ref: React.RefObject<ModalRef | null> }) => {
  const { signOut } = useSession()

  const handleLogout = () => {
    signOut()
    queryClient.clear()
  }

  return (
    <SheetModal ref={ref}>
      <YStack width="100%">
        <Heading textAlign="center" size="extraLarge">
          Logout
        </Heading>
        <Separator marginVertical={16} borderColor="$grey200" borderWidth={1} flex={1} />
        <Text textAlign="center" size="medium" fontWeight="600">
          Are you sure you want to log out?
        </Text>
      </YStack>
      <XStack gap={16}>
        <Button
          fontWeight="700"
          variant="secondary"
          flex={1}
          onPress={() => {
            ref.current?.close()
          }}>
          Cancel
        </Button>
        <Button fontWeight="700" flex={1} onPress={handleLogout}>
          Yes, Logout
        </Button>
      </XStack>
    </SheetModal>
  )
}

export default LogoutModalContext
