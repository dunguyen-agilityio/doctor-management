import { StackProps, XStack } from 'tamagui'

import { Text } from '@app/components/common'

import { Star } from '@icons'

interface StarsProps extends StackProps {
  stars: number
  max?: number
  size?: number
}

const Stars = ({ stars, size = 12, max = stars, ...otherProps }: StarsProps) => {
  return (
    <XStack alignItems="center" testID="stars" gap="$sm" {...otherProps}>
      <Text testID="stars-text" fontWeight="600" size="extraSmall">
        {stars.toFixed(1)}
      </Text>
      <XStack alignItems="center" gap={2}>
        {[...new Array(Math.floor(max)).keys()].map((value) => (
          <Star testID={`star-${value}`} width={size} height={size} key={value} />
        ))}
      </XStack>
    </XStack>
  )
}

export default Stars
