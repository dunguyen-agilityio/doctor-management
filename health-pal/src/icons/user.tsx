import Svg, { G, Path, SvgProps } from 'react-native-svg'

const User = (props: SvgProps) => {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <G id="vuesax/linear/user">
        <G id="user">
          <Path
            id="Vector"
            d="M9 9.5C11.0711 9.5 12.75 7.82107 12.75 5.75C12.75 3.67893 11.0711 2 9 2C6.92893 2 5.25 3.67893 5.25 5.75C5.25 7.82107 6.92893 9.5 9 9.5Z"
            stroke="#9CA3AF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            id="Vector_2"
            d="M15.4426 17C15.4426 14.0975 12.5551 11.75 9.00011 11.75C5.44511 11.75 2.55762 14.0975 2.55762 17"
            stroke="#9CA3AF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </G>
    </Svg>
  )
}

export default User
