import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder'

import { Card, Separator, XStack, YStack } from 'tamagui'

import { BOOKING_TABS } from '@app/types/booking'

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
          <Placeholder Animation={ShineOverlay} style={{ minWidth: '45%', height: 36 }}>
            <PlaceholderLine height={36} width={100} style={{ borderRadius: 24 }} />
          </Placeholder>
          <Placeholder Animation={ShineOverlay} style={{ minWidth: '45%', height: 36 }}>
            <PlaceholderLine height={36} width={100} style={{ borderRadius: 24 }} />
          </Placeholder>
        </XStack>
      </>
    )
  }

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
      marginBottom={10}>
      {/* Date and Time */}
      <Card.Header>
        <Placeholder Animation={ShineOverlay}>
          <PlaceholderLine height={14} width={60} />
        </Placeholder>
        <Separator marginVertical={12} />
      </Card.Header>

      <Card.Footer>
        <YStack flex={1}>
          <XStack gap={10}>
            <Placeholder Animation={ShineOverlay} style={{ width: 110 }}>
              <PlaceholderMedia size={109} style={{ borderRadius: 8 }} />
            </Placeholder>

            <YStack paddingVertical={14} gap={8} flex={1}>
              <Placeholder Animation={ShineOverlay}>
                <PlaceholderLine height={16} width={80} />
                <PlaceholderLine height={14} width={60} />
                <PlaceholderLine height={12} width={70} />
              </Placeholder>
            </YStack>
          </XStack>

          {renderActionSkeleton()}
        </YStack>
      </Card.Footer>
    </Card>
  )
}

export default BookingCardSkeleton
