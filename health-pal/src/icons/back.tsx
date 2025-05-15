import Svg, { Path, SvgProps } from 'react-native-svg'

import { tokens } from '@/tamagui.config'

const Back = ({ stroke = tokens.color.gray.val, ...props }: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9.57 5.93005L3.5 12.0001L9.57 18.0701"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.4999 12H3.66992"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Back
