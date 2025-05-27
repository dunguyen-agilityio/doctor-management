import { BackHandler } from 'react-native'

import { CheckCircle } from '@tamagui/lucide-icons'

import { Button, Heading, Text, YStack } from '@theme'

import { Modal } from '@app/components'
import { ModalRef } from '@app/types/modal'

const QuitAppConfirmModal = ({ ref }: { ref?: React.RefObject<ModalRef | null> }) => {
  const handleCancelBooking = () => {
    ref?.current?.close()
    BackHandler.exitApp()
  }

  const handleClose = () => {
    ref?.current?.close()
  }

  return (
    <Modal ref={ref} closeButtonShown>
      <YStack alignItems="center" paddingHorizontal={42} gap={32} paddingVertical={32}>
        <YStack
          height={100}
          width={100}
          borderRadius={100}
          backgroundColor="#e0f7f9"
          alignItems="center"
          justifyContent="center">
          <CheckCircle color="$teal" size={50} />
        </YStack>

        <Heading size="extraLarge">Confirm Quit</Heading>

        <Text size="small" textAlign="center">
          Are you sure you want to quit application?
        </Text>

        <YStack gap={10} width="100%">
          <Button onPress={handleCancelBooking}>Yes, Quit</Button>
          <Button
            variant="secondary"
            backgroundColor="transparent"
            color="$teal"
            borderWidth={0}
            onPress={handleClose}>
            No, Keep Application
          </Button>
        </YStack>
      </YStack>
    </Modal>
  )
}

export default QuitAppConfirmModal
