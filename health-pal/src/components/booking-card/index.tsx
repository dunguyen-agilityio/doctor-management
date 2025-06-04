import { useRef } from 'react'

import { router } from 'expo-router'

import { Card, Separator } from 'tamagui'

import { PLACEHOLDER_IMAGE } from '@app/constants/image'

import { Button, Heading, Text, XStack, YStack } from '@theme'

import { BOOKING_TABS } from '@app/types/booking'
import { ModalRef } from '@app/types/modal'
import CancelBookingModal from '@app/ui/booking/cancel-booking-modal'

import CloudinaryImage from '../cloudinary-image'

type TBookingCard = {
  date: string
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
          action: () =>
            router.navigate({
              pathname: '/(app)/booking',
              params: { doctorId, bookingId: documentId, date, time },
            }),
        },
      ],
    }

    const actions = ACTIONS[type]

    if (actions.length < 1) return null

    const [action1, action2] = actions

    return (
      <XStack marginTop={10} gap={10}>
        <Button variant="secondary" sizeButton="sm" flex={1} onPress={action1.action}>
          {action1.title}
        </Button>
        <Button flex={1} sizeButton="sm" onPress={action2.action}>
          {action2.title}
        </Button>
      </XStack>
    )
  }
  return (
    <>
      <Card
        borderRadius={12}
        borderWidth={0.5}
        borderColor="$grey100"
        backgroundColor="$white"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={6}
        elevation={3}
        padding={10}
        marginBottom={10}>
        {/* Date and Time */}
        <Card.Header>
          <Heading fontSize={14}>
            {date} - {time}
          </Heading>
          <Separator marginVertical={12} />
        </Card.Header>

        <Card.Footer>
          {/* Doctor Info */}
          <YStack flex={1}>
            <XStack gap={10}>
              <CloudinaryImage
                source={{ uri: doctorAvatar }}
                style={{ height: 109, width: 109, borderRadius: 8 }}
                placeholder={PLACEHOLDER_IMAGE}
              />
              <YStack paddingVertical={14}>
                <Text fontSize={16} fontWeight="bold">
                  {doctorName}
                </Text>
                <Text fontSize={14} color="#6B7280">
                  {specialty}
                </Text>
                <Text fontSize={12} color="#9CA3AF" numberOfLines={1} maxWidth={250}>
                  {address}
                </Text>
              </YStack>
            </XStack>

            {/* Buttons */}
            {renderAction()}
          </YStack>
        </Card.Footer>
      </Card>
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
