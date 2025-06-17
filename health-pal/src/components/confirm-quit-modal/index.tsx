import { CheckCircle } from '@/icons'

import { BackHandler } from 'react-native'

import { Button, Heading, Modal, Text, YStack } from '@/components/common'

import { ModalRef } from '@/types/modal'

import { ModalProps } from '../common/modal'

const QuitAppConfirmModal = ({
  ref,
  ...props
}: { ref?: React.RefObject<ModalRef | null> } & ModalProps) => {
  const handleCancelBooking = () => {
    ref?.current?.close()
    BackHandler.exitApp()
  }

  const handleClose = () => {
    ref?.current?.close()
  }

  return (
    <Modal ref={ref} closeButtonShown {...props}>
      <YStack alignItems="center" paddingHorizontal={42} gap={32} paddingVertical={32}>
        <YStack
          height={100}
          width={100}
          borderRadius={100}
          backgroundColor="#e0f7f9"
          alignItems="center"
          justifyContent="center">
          <CheckCircle color="$teal" width={50} />
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
