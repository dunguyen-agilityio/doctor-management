import { useRef } from 'react'
import { TextInput } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { IconProps } from '@tamagui/helpers-icon'
import { InputProps, XStack, YStack } from 'tamagui'

import { Input as TamaguiInput, Text } from '@theme'

type IconComponent =
  | ((propsIn: IconProps) => React.ReactElement)
  | ((propsIn: SvgProps) => React.ReactElement)

interface CustomInputProps extends InputProps {
  leftIcon?: IconComponent | null
  ref?: React.Ref<TextInput>
  errorMessage?: string
  onEndEdit?: (isChanged: boolean) => void
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

const Input = ({
  leftIcon: LeftIcon = null,
  errorMessage,
  onFocus,
  onEndEdit,
  ref,
  onEndEditing,
  ...props
}: CustomInputProps) => {
  const hasIcon = LeftIcon !== null
  const valueRef = useRef(props.value)

  return (
    <YStack gap="$sm" width="100%">
      <XStack alignItems="center" gap={8}>
        {hasIcon ? <LeftIcon position="absolute" zIndex={200} left={16} size={16} /> : null}
        <TamaguiInput
          ref={ref}
          flex={1}
          {...styleByIcon[hasIcon ? 'true' : 'false']}
          {...(errorMessage && { borderColor: 'red', focusStyle: { borderColor: 'red' } })}
          {...props}
          onFocus={(e) => {
            valueRef.current = props.value
            onFocus?.(e)
          }}
          onEndEditing={(e) => {
            onEndEdit?.(e.nativeEvent.text !== valueRef.current)
            onEndEditing?.(e)
          }}
        />
      </XStack>
      {errorMessage && (
        <Text color="red" size="extraSmall">
          {errorMessage}
        </Text>
      )}
    </YStack>
  )
}

export default Input
