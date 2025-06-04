import Svg, { Path, SvgProps } from 'react-native-svg'

const ChevronDown = (props: SvgProps) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}>
      <Path d="m6 9 6 6 6-6" />
    </Svg>
  )
}

export default ChevronDown
