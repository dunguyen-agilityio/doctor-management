import { Separator, XStack, YStack } from 'tamagui'

import { Button, Heading, SheetModal } from '@app/components'

import { ModalRef } from '@app/types/modal'

const RemoveFavoriteModal = ({
  ref,
  onConfirm,
  children,
}: React.PropsWithChildren<{
  ref: React.RefObject<ModalRef | null>
  onConfirm: () => void
}>) => {
  const handleLogout = () => {
    onConfirm()
  }

  return (
    <SheetModal height="auto" paddingHorizontal={0} ref={ref}>
      <YStack marginHorizontal={24}>
        <YStack>
          <Heading textAlign="center" size="extraLarge">
            Remove from Favorites?
          </Heading>
          <Separator
            marginVertical={16}
            borderColor="$grey200"
            borderWidth={0}
            borderTopWidth={1}
            flex={1}
          />
          {children}
        </YStack>
        <XStack gap={16} paddingTop={16}>
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
            Yes, Remove
          </Button>
        </XStack>
      </YStack>
    </SheetModal>
  )
}

export default RemoveFavoriteModal
