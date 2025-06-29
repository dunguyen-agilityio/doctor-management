import Svg, { Path, SvgProps } from 'react-native-svg'

const UserEdit = (props: SvgProps) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.2101 16.24L15.67 19.7801C15.53 19.9201 15.4 20.18 15.37 20.37L15.18 21.72C15.11 22.21 15.45 22.55 15.94 22.48L17.29 22.29C17.48 22.26 17.75 22.13 17.88 21.99L21.42 18.45C22.03 17.84 22.32 17.13 21.42 16.23C20.53 15.34 19.8201 15.63 19.2101 16.24Z"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.7002 16.75C19.0002 17.83 19.8402 18.67 20.9202 18.97"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.41016 22.5C3.41016 18.63 7.26018 15.5 12.0002 15.5C13.0402 15.5 14.0402 15.65 14.9702 15.93"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default UserEdit
