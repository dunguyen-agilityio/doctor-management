import { SvgProps } from 'react-native-svg'

export type TSpecialty = {
  icon: (props: SvgProps) => React.JSX.Element
  name: string
  value: string
  color: string
}
