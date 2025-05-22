import Svg, { Path, SvgProps } from 'react-native-svg'

const Sort = (props: SvgProps) => {
  return (
    <Svg width="14" height="15" viewBox="0 0 14 15" fill="none" {...props}>
      <Path
        d="M6.09586 4.41998L3.92584 2.25L1.75586 4.41998"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.92578 12.75V2.25"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.9043 10.5801L10.0743 12.7501L12.2443 10.5801"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.0742 2.25V12.75"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Sort
