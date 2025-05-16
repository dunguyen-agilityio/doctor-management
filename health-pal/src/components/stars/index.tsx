import { Star } from '@tamagui/lucide-icons'

import { XStack } from '@theme/stack'
import { Text } from '@theme/text'

const Stars = ({ stars }: { stars: number }) => {
  return (
    <XStack alignItems="center" gap="$sm">
      <Text fontWeight="600" size="extraSmall">
        {stars.toFixed(1)}
      </Text>
      <XStack>
        {[...new Array(Math.floor(stars)).keys()].map((value) => (
          <Star size={14} color="#FFD700" fill="#FFD700" key={value} />
        ))}
      </XStack>
    </XStack>
  )
}

export default Stars
