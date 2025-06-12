import Svg, { Path, SvgProps } from 'react-native-svg'

import { tokens } from '@tamagui.config'

const ArrowLeft = ({ fill = tokens.color.grey400.val, ...props }: SvgProps) => {
  return (
    <Svg width="14" height="15" viewBox="0 0 14 15" fill="none">
      <Path
        d="M8.15481 3.60334L6.28231 5.47584L5.13314 6.61917C4.64898 7.10334 4.64898 7.89084 5.13314 8.37501L8.15481 11.3967C8.55148 11.7933 9.22814 11.5075 9.22814 10.9533V7.68084V4.04667C9.22814 3.48667 8.55148 3.20667 8.15481 3.60334Z"
        fill={fill}
      />
    </Svg>
  )
}

export default ArrowLeft
