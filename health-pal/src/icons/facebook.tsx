import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg'

const Facebook = (props: SvgProps) => {
  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
      <G clip-path="url(#clip0_2_3210)">
        <Rect x="0.5" y="0.5" width="20" height="20" rx="6" fill="#1877F2" />
        <Path
          d="M14.3926 13.3906L14.8359 10.5H12.0625V8.625C12.0625 7.83398 12.4492 7.0625 13.6914 7.0625H14.9531V4.60156C14.9531 4.60156 13.8086 4.40625 12.7148 4.40625C10.4297 4.40625 8.9375 5.79102 8.9375 8.29688V10.5H6.39844V13.3906H8.9375V20.3789C9.44727 20.459 9.96875 20.5 10.5 20.5C11.0312 20.5 11.5527 20.459 12.0625 20.3789V13.3906H14.3926Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2_3210">
          <Rect x="0.5" y="0.5" width="20" height="20" rx="6" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Facebook
