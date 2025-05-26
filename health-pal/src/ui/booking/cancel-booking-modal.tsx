import { router } from 'expo-router'

import { CheckCircle } from '@tamagui/lucide-icons'

import { Button, Heading, Text, YStack } from '@theme'

import { Modal } from '@app/components'
import { useSession } from '@app/contexts'
import { useAppLoading } from '@app/hooks'
import { TBookingCard } from '@app/models/booking'
import { queryClient } from '@app/react-query.config'
import { updateBooking } from '@app/services/booking'
import { BOOKING_TABS } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'

export type CancelBookingParams = Pick<TBookingCard, 'date' | 'documentId' | 'time' | 'doctorName'>

interface Props extends CancelBookingParams {
  ref: React.RefObject<ModalRef | null>
}

const CancelBookingModal = ({ ref, date, doctorName, documentId, time }: Props) => {
  const { session } = useSession()
  const jwt = session?.jwt
  const setAppLoading = useAppLoading()

  const handleClose = () => {
    ref.current?.close()
  }

  const handleCancelBooking = async () => {
    if (!jwt) return

    try {
      setAppLoading(true)

      handleClose()

      const response = await updateBooking({ documentId, type: BOOKING_TABS.CANCELED }, jwt)

      if (response.data) {
        await queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.CANCELED] })
        await queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.UPCOMING] })
        router.navigate({
          pathname: '/(app)/(tabs)/bookings',
          params: { type: BOOKING_TABS.CANCELED },
        })
      }
    } catch (error) {
      console.log('error', error)
    }

    setAppLoading(false)
  }

  return (
    <Modal ref={ref}>
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

        <Heading size="extraLarge">Confirm Cancellation</Heading>

        <Text size="small" textAlign="center">
          Are you sure you want to cancel your appointment with{' '}
          <Text size="small" fontWeight="700">
            {doctorName}
          </Text>{' '}
          on{' '}
          <Text size="small" fontWeight="700">
            {date}
          </Text>
          ?
        </Text>

        <YStack gap={10} width="100%">
          <Button onPress={handleCancelBooking}>Yes, Cancel</Button>
          <Button
            variant="secondary"
            backgroundColor="transparent"
            color="$teal"
            borderWidth={0}
            onPress={handleClose}>
            No, Keep Appointment
          </Button>
        </YStack>
      </YStack>
    </Modal>
  )
}

export default CancelBookingModal
