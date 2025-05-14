import Svg, { G, Path, SvgProps } from 'react-native-svg'

const ArrowDown = (props: SvgProps) => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
      <G id="vuesax/linear/arrow-down">
        <G id="arrow-down">
          <Path
            id="Vector"
            d="M12.3699 5.72083L8.56655 9.52416C8.11738 9.97333 7.38238 9.97333 6.93322 9.52416L3.12988 5.72083"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
  )
}

export default ArrowDown
