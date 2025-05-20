import { Image } from 'expo-image'

import { Separator } from 'tamagui'

import { Button, Heading, Text, XStack, YStack } from '@theme'

type TBookingCard = {
  date: Date
  time: string
  doctorName: string
  doctorAvatar?: string
  specialty: string
  address: string
}

const BookingCard = ({
  date,
  time,
  doctorName,
  specialty,
  doctorAvatar,
  address,
}: TBookingCard) => {
  return (
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
        <Image source={{ uri: doctorAvatar }} style={{ width: 60, height: 60, borderRadius: 8 }} />
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
      <XStack marginTop={10} gap={10}>
        <Button variant="secondary" flex={1}>
          Cancel
        </Button>
        <Button flex={1}>Reschedule</Button>
      </XStack>
    </YStack>
  )
}

export default BookingCard
