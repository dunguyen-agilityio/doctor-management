import { StackProps } from 'tamagui'

import { Text, XStack } from '@app/components/common'

import { Star } from '@icons'

interface StarsProps extends StackProps {
  stars: number
  max?: number
  size?: number
}

const Stars = ({ stars, max = stars, ...otherProps }: StarsProps) => {
  return (
    <XStack alignItems="center" testID="stars" gap="$sm" {...otherProps}>
      <Text testID="stars-text" fontWeight="600" size="extraSmall">
        {stars.toFixed(1)}
      </Text>
      <XStack alignItems="center" gap={2}>
        {[...new Array(Math.floor(max)).keys()].map((value) => (
          <Star testID={`star-${value}`} width={12} height={12} key={value} />
        ))}
      </XStack>
    </XStack>
  )
}

export default Stars
