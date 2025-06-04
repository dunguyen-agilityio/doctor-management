import { Star } from '@tamagui/lucide-icons'
import { StackProps } from 'tamagui'

import { Text, XStack } from '@app/components/common'

interface StarsProps extends StackProps {
  stars: number
  max?: number
  size?: number
  color?: string
}

const Stars = ({ stars, max = stars, color = '#ffd700', size = 10, ...otherProps }: StarsProps) => {
  return (
    <XStack alignItems="center" testID="stars" gap="$sm" {...otherProps}>
      <Text testID="stars-text" fontWeight="600" size="extraSmall">
        {stars.toFixed(1)}
      </Text>
      <XStack>
        {[...new Array(Math.floor(max)).keys()].map((value) => (
          <Star testID={`star-${value}`} size={size} color={color} fill={color} key={value} />
        ))}
      </XStack>
    </XStack>
  )
}

export default Stars
