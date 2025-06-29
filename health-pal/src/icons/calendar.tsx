import Svg, { Path, SvgProps } from 'react-native-svg'

import { tokens } from '@tamagui.config'

const Calendar = ({ stroke = tokens.color.grey400.val, ...props }: SvgProps) => {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <Path
        d="M6 2V4.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 2V4.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.625 7.3175H15.375"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.75 6.875V13.25C15.75 15.5 14.625 17 12 17H6C3.375 17 2.25 15.5 2.25 13.25V6.875C2.25 4.625 3.375 3.125 6 3.125H12C14.625 3.125 15.75 4.625 15.75 6.875Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99686 10.775H9.00359"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22049 10.775H6.22723"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22049 13.025H6.22723"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Calendar
