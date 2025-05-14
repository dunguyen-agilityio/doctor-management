import Svg, { Path, SvgProps } from 'react-native-svg'

const HeartFill = (props: SvgProps) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M16.44 3C14.63 3 13.01 3.88 12 5.23C10.99 3.88 9.37 3 7.56 3C4.49 3 2 5.5 2 8.59C2 9.78 2.19 10.88 2.52 11.9C4.1 16.9 8.97 19.89 11.38 20.71C11.72 20.83 12.28 20.83 12.62 20.71C15.03 19.89 19.9 16.9 21.48 11.9C21.81 10.88 22 9.78 22 8.59C22 5.5 19.51 3 16.44 3Z"
        fill="#292D32"
      />
    </Svg>
  )
}

export default HeartFill
