import Svg, { Path, SvgProps } from 'react-native-svg'

import { tokens } from '@tamagui.config'

const Lock = ({ stroke = tokens.color.grey400.val, ...props }: SvgProps) => {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <Path
        d="M4.5 8V6.5C4.5 4.0175 5.25 2 9 2C12.75 2 13.5 4.0175 13.5 6.5V8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 14.375C10.0355 14.375 10.875 13.5355 10.875 12.5C10.875 11.4645 10.0355 10.625 9 10.625C7.96447 10.625 7.125 11.4645 7.125 12.5C7.125 13.5355 7.96447 14.375 9 14.375Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.75 17H5.25C2.25 17 1.5 16.25 1.5 13.25V11.75C1.5 8.75 2.25 8 5.25 8H12.75C15.75 8 16.5 8.75 16.5 11.75V13.25C16.5 16.25 15.75 17 12.75 17Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Lock
