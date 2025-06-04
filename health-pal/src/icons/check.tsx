import Svg, { Path, SvgProps } from 'react-native-svg'

const Check = (props: SvgProps) => {
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
      <Path d="M20 6 9 17l-5-5" />
    </Svg>
  )
}

export default Check
