import Svg, { Path, SvgProps } from 'react-native-svg'

const logout = (props: SvgProps) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M8.8999 8.06023C9.2099 4.46023 11.0599 2.99023 15.1099 2.99023H15.2399C19.7099 2.99023 21.4999 4.78023 21.4999 9.25023V15.7702C21.4999 20.2402 19.7099 22.0302 15.2399 22.0302H15.1099C11.0899 22.0302 9.2399 20.5802 8.9099 17.0402"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.0001 12.5H3.62012"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.85 9.1499L2.5 12.4999L5.85 15.8499"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default logout
