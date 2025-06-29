import Svg, { Path, Polyline, SvgProps } from 'react-native-svg'

const CheckCircle = (props: SvgProps) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></Path>
      <Polyline points="22 4 12 14.01 9 11.01"></Polyline>
    </Svg>
  )
}

export default CheckCircle
