import { CheckCircle } from '@/icons'
import { TBookingCard } from '@/models/booking'
import { formatDate, formatShortDate } from '@/utils/date'

import { router } from 'expo-router'

import { useToastController } from '@tamagui/toast'

import { ROUTES } from '@/constants'

import { useAppLoading } from '@/hooks'

import { Button, Heading, Modal, Text, YStack } from '@/components'
import { ModalProps } from '@/components/common/modal'

import { updateBooking } from '@/services/booking'

import { BOOKING_TABS } from '@/types/booking'
import { ModalRef } from '@/types/modal'

import { queryClient } from '@react-query.config'

export type CancelBookingParams = Pick<TBookingCard, 'date' | 'documentId' | 'doctorName'>

interface Props extends CancelBookingParams, ModalProps {
  ref: React.RefObject<ModalRef | null>
}

const CancelBookingModal = ({ ref, date, doctorName, documentId, ...props }: Props) => {
  const setAppLoading = useAppLoading()
  const toast = useToastController()

  const handleClose = () => {
    ref.current?.close()
  }

  const handleCancelBooking = async () => {
    try {
      setAppLoading(true)
      handleClose()
      const response = await updateBooking({ documentId, type: BOOKING_TABS.CANCELED })

      if (response.data) {
        await queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.CANCELED] })
        await queryClient.invalidateQueries({ queryKey: ['bookings', BOOKING_TABS.UPCOMING] })
        router.navigate({
          pathname: ROUTES.BOOKINGS,
          params: { type: BOOKING_TABS.CANCELED },
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error cancelling booking:', error)
      }

      toast.show('Cancellation Failed', {
        message: 'There was an error cancelling your booking. Please try again later.',
        type: 'error',
        duration: 3000,
      })
    }

    setAppLoading(false)
  }

  return (
    <Modal
      ref={ref}
      testID="cancel-booking-modal"
      aria-label={`Confirm cancellation of booking with ${doctorName} on ${formatDate(date)}`}
      accessibilityHint="Dialog to confirm or keep this appointment"
      {...props}>
      <YStack alignItems="center" paddingHorizontal={42} gap={32} paddingVertical={32}>
        <YStack
          height={100}
          width={100}
          borderRadius={100}
          backgroundColor="#e0f7f9"
          alignItems="center"
          justifyContent="center">
          <CheckCircle color="$teal" />
        </YStack>

        <Heading size="extraLarge">Confirm Cancellation</Heading>

        <Text size="small" textAlign="center">
          Are you sure you want to cancel your appointment with{' '}
          <Text size="small" fontWeight="700">
            {doctorName}
          </Text>{' '}
          on{' '}
          <Text size="small" fontWeight="700">
            {formatShortDate(date)}
          </Text>
          ?
        </Text>

        <YStack gap={10} width="100%">
          <Button
            onPress={handleCancelBooking}
            aria-label={`Confirm cancellation of appointment with ${doctorName}`}
            role="button"
            accessibilityHint="Cancels the appointment and navigates to cancelled bookings">
            Yes, Cancel
          </Button>
          <Button
            variant="secondary"
            backgroundColor="transparent"
            color="$teal"
            borderWidth={0}
            onPress={handleClose}
            aria-label={`Keep appointment with ${doctorName}`}
            accessibilityHint="Closes the dialog and keeps the appointment"
            role="button">
            No, Keep Appointment
          </Button>
        </YStack>
      </YStack>
    </Modal>
  )
}

export default CancelBookingModal
