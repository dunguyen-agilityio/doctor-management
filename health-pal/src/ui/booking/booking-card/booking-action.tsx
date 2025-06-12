import { TBookingCard } from '@/models/booking'
import { formatDate } from '@/utils/date'

import React, { useRef } from 'react'

import { router } from 'expo-router'

import { Separator, XStack } from 'tamagui'

import { ROUTES } from '@/constants'

import { Button } from '@/components'

import { BOOKING_TABS, ModalRef } from '@/types'

import CancelBookingModal from '../cancel-booking-modal'

const BookingAction = ({
  doctorName,
  doctorId,
  date,
  doctorDocId,
  documentId,
  type,
}: Pick<
  TBookingCard,
  'doctorName' | 'doctorId' | 'date' | 'type' | 'documentId' | 'doctorDocId'
>) => {
  const cancelBookRef = useRef<ModalRef>(null)

  const ACTIONS: Record<
    BOOKING_TABS,
    { title: string; action: () => void; ariaLabel: string; ariaHint: string }[]
  > = {
    [BOOKING_TABS.CANCELED]: [],
    [BOOKING_TABS.COMPLETED]: [
      {
        title: 'Re-Book',
        action: () => router.navigate({ pathname: ROUTES.BOOKING, params: { doctorId } }),
        ariaLabel: `Re-book appointment with ${doctorName}`,
        ariaHint: 'Navigates to the booking screen to schedule a new appointment with this doctor',
      },
      {
        title: 'Add Review',
        action: () => router.navigate({ pathname: ROUTES.DOCTOR, params: { id: doctorId } }),
        ariaLabel: `Add a review for ${doctorName}`,
        ariaHint: 'Navigates to the review screen to submit feedback for this doctor',
      },
    ],
    [BOOKING_TABS.UPCOMING]: [
      {
        title: 'Cancel',
        action: () => {
          cancelBookRef.current?.open()
        },
        ariaLabel: `Cancel booking with ${doctorName} on ${formatDate(date)}`,
        ariaHint: 'Opens a confirmation dialog to cancel this appointment',
      },
      {
        title: 'Reschedule',
        action: () =>
          router.navigate({
            pathname: ROUTES.BOOKING,
            params: { doctorId, doctorDocId, bookingId: documentId, date: date.toISOString() },
          }),
        ariaLabel: `Reschedule booking with ${doctorName}`,
        ariaHint: 'Navigates to the booking screen to change the date or time of this appointment',
      },
    ],
  }

  const actions = ACTIONS[type]

  if (actions.length < 1) return null

  const [action1, action2] = actions

  return (
    <>
      {type === BOOKING_TABS.UPCOMING && (
        <CancelBookingModal
          ref={cancelBookRef}
          date={date}
          doctorName={doctorName}
          documentId={documentId}
        />
      )}
      <Separator marginVertical={10} />
      <XStack gap={10}>
        <Button
          variant="secondary"
          sizeButton="sm"
          flex={1}
          onPress={action1.action}
          aria-label={action1.ariaLabel}
          accessibilityHint={action1.ariaHint}>
          {action1.title}
        </Button>
        <Button
          flex={1}
          sizeButton="sm"
          onPress={action2.action}
          aria-label={action2.ariaLabel}
          accessibilityHint={action2.ariaHint}>
          {action2.title}
        </Button>
      </XStack>
    </>
  )
}

export default BookingAction
