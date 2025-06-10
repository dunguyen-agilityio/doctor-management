import dayjs from 'dayjs'

import { Card, Separator } from 'tamagui'

import { Heading, Text, XStack, YStack } from '@app/components'
import CloudinaryImage from '@app/components/cloudinary-image'

import { BOOKING_TABS } from '@app/types/booking'

import { TBookingCard } from '@app/models/booking'

import BookingAction from './booking-action'

const BookingCard = ({
  date,
  time,
  doctorName,
  specialty,
  doctorAvatar,
  address,
  documentId,
  doctorId,
  doctorDocId,
  ...props
}: TBookingCard) => {
  const { type = BOOKING_TABS.UPCOMING } = props

  return (
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
      marginBottom={10}
      aria-label={`Booking with ${doctorName}`}>
      <Card.Header>
        <Heading fontSize={14}>{dayjs(date).format('YYYY-MM-DD - HH:mm A')}</Heading>
        <Separator marginVertical={12} />
      </Card.Header>

      <Card.Footer>
        <YStack flex={1}>
          <XStack gap={10}>
            <CloudinaryImage
              source={{ uri: doctorAvatar }}
              style={{ height: 109, width: 109, borderRadius: 8 }}
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
          <BookingAction
            date={date}
            doctorDocId={doctorDocId}
            doctorId={doctorId}
            doctorName={doctorName}
            documentId={documentId}
            type={type}
          />
        </YStack>
      </Card.Footer>
    </Card>
  )
}

export default BookingCard
