import { Button, Heading, Text, XStack, YStack } from '@theme'

import { Modal } from '@app/components'
import { TBookingCard } from '@app/models/booking'
import { ModalRef } from '@app/types/modal'

interface Props extends Pick<TBookingCard, 'date' | 'time'> {
  ref: React.RefObject<ModalRef | null>
  onReload: () => void
}

const ReloadTimeSlotConfirmModal = ({ ref, date, onReload, time }: Props) => {
  const handleClose = () => {
    ref.current?.close()
  }

  return (
    <Modal ref={ref} contentProps={{ minHeight: 200 }}>
      <YStack padding={16} gap={16} alignItems="center" flex={1}>
        <Heading size="extraLarge">Time Slot Unavailable</Heading>
        <Text size="small">
          The selected time slot ({date} - {time}) is no longer available. Would you like to reload
          the time slots?
        </Text>
        <XStack width="100%" flex={1} alignItems="flex-end" justifyContent="space-around">
          <Button onPress={handleClose} variant="secondary">
            <Text>Cancel</Text>
          </Button>
          <Button onPress={onReload}>Reload Time Slots</Button>
        </XStack>
      </YStack>
    </Modal>
  )
}

export default ReloadTimeSlotConfirmModal
