import { useRef } from 'react'

import { Image } from 'expo-image'
import { router } from 'expo-router'

import { Separator } from 'tamagui'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import { BOOKING_TABS } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'
import CancelBookingModal from '@app/ui/booking/cancel-booking-modal'

type TBookingCard = {
  date: Date
  time: string
  doctorName: string
  doctorAvatar?: string
  specialty: string
  address: string
  documentId: string
  doctorId: string
}

interface BookingCardProps extends TBookingCard {
  type?: BOOKING_TABS
}

const BookingCard = ({
  date,
  time,
  doctorName,
  specialty,
  doctorAvatar,
  address,
  documentId,
  doctorId,
  ...props
}: BookingCardProps) => {
  const cancelBookRef = useRef<ModalRef>(null)
  const { type = BOOKING_TABS.UPCOMING } = props

  const renderAction = () => {
    const ACTIONS: Record<BOOKING_TABS, { title: string; action: () => void }[]> = {
      [BOOKING_TABS.CANCELED]: [],
      [BOOKING_TABS.COMPLETED]: [
        {
          title: 'Re-Book',
          action: () => router.navigate({ pathname: '/(app)/booking', params: { doctorId } }),
        },
        {
          title: 'Add Review',
          action: () =>
            router.navigate({ pathname: '/(app)/doctors/details/[id]', params: { id: doctorId } }),
        },
      ],
      [BOOKING_TABS.UPCOMING]: [
        {
          title: 'Cancel',
          action: () => {
            cancelBookRef.current?.open()
          },
        },
        {
          title: 'Reschedule',
          action: () => router.navigate({ pathname: '/(app)/booking', params: { doctorId } }),
        },
      ],
    }

    const actions = ACTIONS[type]

    if (actions.length < 1) return null

    const [action1, action2] = actions

    return (
      <XStack marginTop={10} gap={10}>
        <Button variant="secondary" flex={1} onPress={action1.action}>
          {action1.title}
        </Button>
        <Button flex={1} onPress={action2.action}>
          {action2.title}
        </Button>
      </XStack>
    )
  }
  return (
    <>
      <YStack
        borderRadius={12}
        borderWidth={0.5}
        borderColor="#F3F4F6"
        backgroundColor="#FFF"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={6}
        elevation={3}
        padding={10}
        marginBottom={10}>
        {/* Date and Time */}
        <Heading fontSize={14}>
          {date} - {time}
        </Heading>
        <Separator marginVertical={12} />

        {/* Doctor Info */}
        <XStack alignItems="center" gap={10}>
          <Image
            source={{ uri: doctorAvatar }}
            style={{ width: 60, height: 60, borderRadius: 8 }}
          />
          <YStack>
            <Text fontSize={16} fontWeight="bold">
              {doctorName}
            </Text>
            <Text fontSize={14} color="#6B7280">
              {specialty}
            </Text>
            <Text fontSize={12} color="#9CA3AF">
              {address}
            </Text>
          </YStack>
        </XStack>

        {/* Buttons */}
        {renderAction()}
      </YStack>
      {props.type === BOOKING_TABS.UPCOMING && (
        <CancelBookingModal
          ref={cancelBookRef}
          date={date}
          doctorName={doctorName}
          documentId={documentId}
          time={time}
        />
      )}
    </>
  )
}

export default BookingCard
