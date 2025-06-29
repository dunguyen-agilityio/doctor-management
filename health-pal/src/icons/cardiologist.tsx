import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg'

const Cardiologist = (props: SvgProps) => {
  return (
    <Svg width="36" height="32" viewBox="0 0 36 32" fill="none" {...props}>
      <G clip-path="url(#clip0_2_3329)">
        <Path
          d="M1.30762 17.1261H11.5702L14.567 9.25256L18.4321 22.678L22.7488 13.35L25.4808 17.2705H35.4036"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M33.5725 13.9264C34.3485 12.3471 34.6351 10.897 34.6351 9.60863C34.6351 6.82998 32.6282 1.08057 26.1081 1.08057C19.588 1.08057 17.9501 6.66934 17.9501 6.66934C17.9501 6.66934 16.3123 1.08599 9.79222 1.08599C3.27216 1.08599 1.26416 6.83866 1.26416 9.61405C1.26416 10.859 1.53225 12.2559 2.25188 13.7744"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.99268 20.9413C11.9001 25.0778 15.901 29.0167 17.9502 30.9195C19.9973 29.0189 23.996 25.0843 27.8969 20.9521"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_3329">
          <Rect
            width="35.3333"
            height="31.0329"
            fill="white"
            transform="translate(0.666992 0.483521)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Cardiologist
