import Svg, { Path, SvgProps } from 'react-native-svg'

const MessageQuestion = (props: SvgProps) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M17 18.9302H13L8.54999 21.8902C7.88999 22.3302 7 21.8602 7 21.0602V18.9302C4 18.9302 2 16.9302 2 13.9302V7.93018C2 4.93018 4 2.93018 7 2.93018H17C20 2.93018 22 4.93018 22 7.93018V13.9302C22 16.9302 20 18.9302 17 18.9302Z"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9998 11.8599V11.6499C11.9998 10.9699 12.4198 10.6099 12.8398 10.3199C13.2498 10.0399 13.6598 9.6799 13.6598 9.0199C13.6598 8.0999 12.9198 7.35986 11.9998 7.35986C11.0798 7.35986 10.3398 8.0999 10.3398 9.0199"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9955 14.25H12.0045"
        stroke="#1C2A3A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default MessageQuestion
