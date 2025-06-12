import { getMediaQuery } from '@/utils/media-query'

import { Card, Separator, XStack, YStack } from 'tamagui'

import { LineLoader } from './line-loader'
import { MediaLoader } from './media-loader'

interface DoctorCardSkeletonProps {
  showReview?: boolean
}

const DoctorCardSkeleton = ({ showReview = true }: DoctorCardSkeletonProps) => {
  const { height } = getMediaQuery({ height: 133, full: true })

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
        <MediaLoader width={110} height={110} borderRadius={12} />
      </Card.Header>
      <Card.Footer flex={1} paddingVertical={0} marginVertical={0}>
        <YStack paddingRight={12} flex={1} gap={8}>
          <LineLoader width={140} height={20} />
          <Separator marginVertical={8} />
          <YStack gap={4}>
            <LineLoader width={120} height={14} />
            <LineLoader width={100} height={14} />
          </YStack>
          {showReview && (
            <XStack alignItems="center" gap={8}>
              <LineLoader width={80} height={12} />
              <Separator vertical height={8} />
              <LineLoader width={80} height={12} />
            </XStack>
          )}
        </YStack>
        {showReview && (
          <MediaLoader
            width={24}
            height={24}
            borderRadius={12}
            style={{ position: 'absolute', top: 0, right: 6 }}
          />
        )}
      </Card.Footer>
    </Card>
  )
}

export default DoctorCardSkeleton
