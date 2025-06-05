import Svg, { Polyline, SvgProps } from 'react-native-svg'

const ChevronUp = (props: SvgProps) => {
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
      <Polyline points="18 15 12 9 6 15"></Polyline>
    </Svg>
  )
}

export default ChevronUp
