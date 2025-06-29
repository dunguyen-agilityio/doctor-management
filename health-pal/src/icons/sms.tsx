import Svg, { G, Path, SvgProps } from 'react-native-svg'

const Sms = (props: SvgProps) => {
  return (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <G id="vuesax/linear/sms">
        <G id="sms">
          <Path
            id="Vector"
            d="M12.75 15.875H5.25C3 15.875 1.5 14.75 1.5 12.125V6.875C1.5 4.25 3 3.125 5.25 3.125H12.75C15 3.125 16.5 4.25 16.5 6.875V12.125C16.5 14.75 15 15.875 12.75 15.875Z"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_2"
            d="M12.75 7.25L10.4025 9.125C9.63 9.74 8.3625 9.74 7.59 9.125L5.25 7.25"
            stroke="#9CA3AF"
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

export default Sms
