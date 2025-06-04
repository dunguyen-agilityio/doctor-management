import Svg, { Circle, Path, SvgProps } from 'react-native-svg'

const Ban = (props: SvgProps) => {
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
      <Circle cx="12" cy="12" r="10" />
      <Path d="m4.9 4.9 14.2 14.2" />
    </Svg>
  )
}

export default Ban
