import Svg, { Circle, Path } from 'react-native-svg'

import { XStack } from 'tamagui'

const EmptyIcon = () => (
  <XStack alignItems="center" justifyContent="center">
    <Svg width={80} height={80} viewBox="0 0 24 24">
      {/* Circle background */}
      <Circle cx="12" cy="12" r="10" fill="none" stroke="#ccc" strokeWidth="1" />
      {/* Medical cross */}
      <Path d="M12 8v8M8 12h8" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
      {/* Diagonal line for "empty" indication */}
      <Path d="M6 6l12 12" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  </XStack>
)

export default EmptyIcon
