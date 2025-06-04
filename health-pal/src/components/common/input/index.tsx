import { Fragment, useRef } from 'react'
import { TextInput } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { IconProps } from '@tamagui/helpers-icon'
import { InputProps, Input as TamaguiInput, XStack, YStack, styled } from 'tamagui'

import { ButtonProps } from '../button'
import { Text } from '../text'

export const CustomTamaguiInput = styled(TamaguiInput, {
  fontFamily: '$body',
  fontWeight: '400',
  fontSize: '$s',
  variants: {
    variant: {
      flat: {
        backgroundColor: '$grey50',
        color: '$grey600',
        borderRadius: '$1',
        height: 45,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: '$grey300',
        placeholderTextColor: '$grey400',
      },
      bordered: {
        color: '$primary',
        backgroundColor: 'transparent',
        py: 10,
        borderWidth: 1,
        borderColor: '$grey200',
        borderRadius: '$1',
        height: 40,
      },
      outlined: {
        backgroundColor: '$grey100',
        color: '$grey600',
        height: 45,
        paddingVertical: 12,
        paddingHorizontal: 16,
        placeholderTextColor: '$grey400',
        borderRadius: 8,
        borderWidth: 0,
      },
    },
  } as const,
  defaultVariants: { variant: 'flat' },
})

type IconComponent =
  | ((propsIn: IconProps) => React.ReactElement)
  | ((propsIn: SvgProps) => React.ReactElement)

interface CustomInputProps extends Omit<Parameters<typeof CustomTamaguiInput>[0], 'onBlur'> {
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

export const Input = ({
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
        <CustomTamaguiInput
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
