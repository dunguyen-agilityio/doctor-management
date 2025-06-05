import { Card, CardProps, Separator, XStack } from 'tamagui'

import { LineLoader } from './line-loader'
import { MediaLoader } from './media-loader'

const HospitalCardSkeleton = ({ ...props }: CardProps) => {
  return (
    <Card
      elevate
      bordered
      borderRadius="$2"
      elevation={3}
      shadowColor="$black"
      overflow="hidden"
      shadowOffset={{ width: 4, height: 4 }}
      {...props}>
      <Card.Header padding={0} position="relative">
        <MediaLoader height={120} width="100%" borderRadius={0} />
      </Card.Header>
      <Card.Footer padding={12} paddingTop={8} gap="$sm" flexDirection="column">
        <LineLoader width="90%" height={18} />
        <XStack alignItems="center" gap="$sm">
          <LineLoader width={120} height={12} />
        </XStack>
        <XStack alignItems="center" gap="$sm">
          <LineLoader width="80%" height={15} />
        </XStack>
        <Separator backgroundColor="$grey200" />
        <XStack justifyContent="space-between">
          <XStack alignItems="center" width="45%" gap="$sm">
            <LineLoader width="100%" height={16} />
          </XStack>
          <XStack alignItems="center" width="45%" gap="$sm">
            <LineLoader width="100%" height={16} />
          </XStack>
        </XStack>
      </Card.Footer>
    </Card>
  )
}

export default HospitalCardSkeleton
