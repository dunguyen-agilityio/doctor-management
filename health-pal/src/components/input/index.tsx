import { Fragment, useRef } from 'react'
import { TextInput } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { IconProps } from '@tamagui/helpers-icon'
import { XStack, YStack } from 'tamagui'

import { ButtonProps, InputProps, Input as TamaguiInput, Text } from '@theme'

type IconComponent =
  | ((propsIn: IconProps) => React.ReactElement)
  | ((propsIn: SvgProps) => React.ReactElement)

interface CustomInputProps extends Omit<InputProps, 'onBlur'> {
  leftIcon?: IconComponent | null
  rightIcon?: IconComponent | null
  ref?: React.Ref<TextInput>
  errorMessage?: string
  onEdited?: (isChanged: boolean) => void
  rightButton?: ({ children }: ButtonProps) => React.ReactNode
}

export type { CustomInputProps as InputProps }

const styleByIcon: Record<'true' | 'false', InputProps> = {
  true: {
    paddingLeft: 54,
    position: 'relative',
  },
  false: {
    paddingLeft: 16,
  },
}

const Input = ({
  leftIcon: LeftIcon = null,
  rightIcon: RightIcon = null,
  errorMessage,
  onFocus,
  onEdited,
  ref,
  onEndEditing,
  defaultValue,
  value = defaultValue,
  rightButton: RightButton = Fragment,
  ...props
}: CustomInputProps) => {
  const hasLeftIcon = LeftIcon !== null
  const hasRightIcon = RightIcon !== null
  const valueRef = useRef(value)

  return (
    <YStack gap="$sm" width="100%">
      <XStack alignItems="center">
        {hasLeftIcon ? (
          <LeftIcon testID="left-icon" position="absolute" zIndex={200} left={16} size={16} />
        ) : null}
        <TamaguiInput
          ref={ref}
          flex={1}
          {...(errorMessage && { borderColor: 'red', focusStyle: { borderColor: 'red' } })}
          {...props}
          value={value}
          onFocus={(e) => {
            valueRef.current = value
            onFocus?.(e)
          }}
          defaultValue={defaultValue}
          onEndEditing={(e) => {
            onEdited?.(e.nativeEvent.text !== valueRef.current)
            onEndEditing?.(e)
          }}
          {...styleByIcon[hasLeftIcon ? 'true' : 'false']}
        />
        {hasRightIcon ? (
          <RightButton
            padding={0}
            height={16}
            testID="right-icon"
            position="absolute"
            zIndex={200}
            right={16}>
            <RightIcon size={16} />
          </RightButton>
        ) : null}
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
