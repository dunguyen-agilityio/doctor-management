import { router } from 'expo-router'

import { Separator } from 'tamagui'

import { ROUTES } from '@/constants'

import { useSession } from '@/hooks/use-session'

import { Button, Heading, SheetModal, Text, XStack, YStack } from '@/components'

import { ModalRef } from '@/types/modal'

import { queryClient } from '@react-query.config'

const LogoutModal = ({ ref }: { ref: React.RefObject<ModalRef | null> }) => {
  const { signOut } = useSession()

  const handleLogout = async () => {
    router.replace(ROUTES.LOGIN)
    queryClient.clear()
    signOut()
  }

  return (
    <SheetModal
      ref={ref}
      testID="sheet-modal"
      aria-label="Logout confirmation"
      accessibilityHint="Dialog to confirm logging out of your account">
      <YStack width="100%">
        <Heading textAlign="center" size="extraLarge" aria-label="Logout">
          Logout
        </Heading>
        <Separator
          marginVertical={16}
          borderColor="$grey200"
          borderWidth={0}
          borderTopWidth={1}
          flex={1}
        />
        <Text
          textAlign="center"
          size="medium"
          color="$grey500"
          fontWeight="600"
          aria-label="Are you sure you want to log out?">
          Are you sure you want to log out?
        </Text>
      </YStack>
      <XStack gap={16} paddingTop={16}>
        <Button
          fontWeight="700"
          variant="secondary"
          flex={1}
          onPress={() => {
            ref.current?.close()
          }}
          aria-label="Cancel logout"
          accessibilityHint="Cancels the logout action and closes the dialog">
          Cancel
        </Button>
        <Button
          fontWeight="700"
          flex={1}
          onPress={handleLogout}
          aria-label="Confirm logout"
          accessibilityHint="Logs out of your account and closes the dialog">
          Yes, Logout
        </Button>
      </XStack>
    </SheetModal>
  )
}

export default LogoutModal
