import { formatDate } from '@/utils/date'
import { useFormContext } from 'react-hook-form'

import { Button, Heading, Modal, Text, XStack, YStack } from '@/components'

import { BookingForm } from '@/types/booking'
import { ModalRef } from '@/types/modal'

interface Props {
  ref: React.RefObject<ModalRef | null>
  onReload: () => void
}

const ReloadTimeSlotConfirmModal = ({ ref, onReload }: Props) => {
  const { watch } = useFormContext<BookingForm>()

  const date = watch('date')
  const formattedDate = formatDate(date)
  const handleClose = () => {
    ref.current?.close()
  }

  return (
    <Modal ref={ref} minHeight={200}>
      <YStack padding={16} gap={16} alignItems="center" flex={1}>
        <Heading size="extraLarge">Time Slot Unavailable</Heading>
        <Text size="small">
          The selected time slot ({formattedDate}) is no longer available. Would you like to reload
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
