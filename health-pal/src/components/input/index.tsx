import { TextInput } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { IconProps } from '@tamagui/helpers-icon'
import { InputProps, XStack } from 'tamagui'

import { Input as TamaguiInput } from '@theme'

type IconComponent =
  | ((propsIn: IconProps) => React.ReactElement)
  | ((propsIn: SvgProps) => React.ReactElement)

interface CustomInputProps extends InputProps {
  leftIcon?: IconComponent | null
  ref?: React.Ref<TextInput>
}

const styleByIcon: Record<'true' | 'false', InputProps> = {
  true: {
    paddingLeft: 42,
    position: 'relative',
  },
  false: {
    paddingLeft: 16,
  },
}

const Input = ({ leftIcon: LeftIcon = null, ref, ...props }: CustomInputProps) => {
  const hasIcon = LeftIcon !== null

  return (
    <XStack alignItems="center" gap={8}>
      {hasIcon ? <LeftIcon position="absolute" zIndex={200} left={16} size={16} /> : null}
      <TamaguiInput ref={ref} flex={1} {...styleByIcon[hasIcon ? 'true' : 'false']} {...props} />
    </XStack>
  )
}

export default Input
