import { Card, Separator, XStack, YStack } from 'tamagui'

import { BOOKING_TABS } from '@app/types/booking'

import { LineLoader } from './line-loader'
import { MediaLoader } from './media-loader'

interface BookingCardSkeletonProps {
  type?: BOOKING_TABS
}

const BookingCardSkeleton = ({ type = BOOKING_TABS.UPCOMING }: BookingCardSkeletonProps) => {
  const renderActionSkeleton = () => {
    if (type === BOOKING_TABS.CANCELED) return null

    return (
      <>
        <Separator marginVertical={12} />
        <XStack justifyContent="space-between">
          <LineLoader width={150} height={36} borderRadius={24} />
          <LineLoader width={150} height={36} borderRadius={24} />
        </XStack>
      </>
    )
  }

  return (
    <Card
      padding={10}
      marginBottom={10}
      borderRadius={12}
      borderWidth={0.5}
      borderColor="$grey100"
      backgroundColor="$white"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.1}
      shadowRadius={6}
      elevation={3}>
      <Card.Header>
        <LineLoader width={120} height={14} />
        <Separator marginVertical={12} />
      </Card.Header>
      <Card.Footer>
        <YStack flex={1}>
          <XStack gap={10}>
            <MediaLoader width={109} height={109} borderRadius={8} />
            <YStack paddingVertical={14} gap={8} flex={1}>
              <LineLoader width={180} height={16} />
              <LineLoader width={100} height={14} />
              <LineLoader width={140} height={12} />
            </YStack>
          </XStack>
          {renderActionSkeleton()}
        </YStack>
      </Card.Footer>
    </Card>
  )
}

export default BookingCardSkeleton
