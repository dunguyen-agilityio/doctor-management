import { Star } from '@tamagui/lucide-icons'
import { StackProps } from 'tamagui'

import { XStack } from '@theme/stack'
import { Text } from '@theme/text'

interface StarsProps extends StackProps {
  stars: number
  max?: number
  size?: number
  color?: string
}

const Stars = ({ stars, max = stars, color = '#ffd700', size = 10, ...otherProps }: StarsProps) => {
  return (
    <XStack alignItems="center" gap="$sm" {...otherProps}>
      <Text fontWeight="600" size="extraSmall">
        {stars.toFixed(1)}
      </Text>
      <XStack>
        {[...new Array(Math.floor(max)).keys()].map((value) => (
          <Star size={size} color={color} fill={color} key={value} />
        ))}
      </XStack>
    </XStack>
  )
}

export default Stars
