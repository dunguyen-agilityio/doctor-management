import Svg, { Path, SvgProps } from 'react-native-svg'

import { tokens } from '@tamagui.config'

const ArrowRight = ({ fill = tokens.color.grey400.val, ...props }: SvgProps) => {
  return (
    <Svg width="14" height="15" viewBox="0 0 14 15" fill="none" {...props}>
      <Path
        d="M8.86648 6.61917L7.71732 5.47L5.84482 3.5975C5.44815 3.20667 4.77148 3.48667 4.77148 4.04667V7.68084V10.9533C4.77148 11.5133 5.44815 11.7933 5.84482 11.3967L8.86648 8.375C9.35065 7.89667 9.35065 7.10334 8.86648 6.61917Z"
        fill={fill}
      />
    </Svg>
  )
}

export default ArrowRight
