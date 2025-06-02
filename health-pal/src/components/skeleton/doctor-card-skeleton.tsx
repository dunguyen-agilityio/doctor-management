import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder'

import { Card, Separator, XStack, YStack } from 'tamagui'

import useMediaQuery from '@app/hooks/use-media-query'

interface DoctorCardSkeletonProps {
  showReview?: boolean
}

const DoctorCardSkeleton = ({ showReview = true }: DoctorCardSkeletonProps) => {
  const { height } = useMediaQuery({ height: 133, full: true })

  return (
    <Card
      elevate
      bordered
      flexDirection="row"
      padding={12}
      paddingRight={0}
      borderWidth={0.5}
      borderRadius={12}
      position="relative"
      borderColor="$grey100"
      shadowColor="$black"
      height={height}
      shadowOffset={{ width: 4, height: 4 }}
      shadowOpacity={0.1}
      gap={12}
      shadowRadius={12}
      elevation={3}>
      <Card.Header padding={0} width={110}>
        <PlaceholderMedia size={110} style={{ borderRadius: 12 }} />
      </Card.Header>
      <Card.Footer flex={1} paddingVertical={0} marginVertical={0}>
        <YStack paddingRight={12} flex={1}>
          <XStack justifyContent="space-between" alignItems="center">
            <Placeholder Animation={ShineOverlay} style={{ width: 320, height: 20 }}>
              <PlaceholderLine height={20} width={50} />
            </Placeholder>
          </XStack>
          <Separator marginVertical={8} />
          <YStack gap={showReview ? 0 : 8}>
            <Placeholder Animation={ShineOverlay}>
              <PlaceholderLine height={14} width={60} />
              <PlaceholderLine height={14} width={70} />
            </Placeholder>
          </YStack>
          {showReview && (
            <XStack alignItems="center">
              <Placeholder Animation={ShineOverlay} style={{ width: 120 }}>
                <PlaceholderLine height={12} width={120} />
              </Placeholder>
            </XStack>
          )}
        </YStack>
        {showReview && (
          <Placeholder Animation={ShineOverlay}>
            <PlaceholderMedia
              size={24}
              style={{
                borderRadius: 12,
                position: 'absolute',
                top: 0,
                right: 6,
              }}
            />
          </Placeholder>
        )}
      </Card.Footer>
    </Card>
  )
}

export default DoctorCardSkeleton
