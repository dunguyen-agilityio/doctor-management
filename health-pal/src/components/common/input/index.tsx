import { Fragment } from 'react'
import { TextInput } from 'react-native'

import { SvgProps } from 'react-native-svg'

import { InputProps, Stack, Input as TamaguiInput, XStack, YStack, styled } from 'tamagui'

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

type IconComponent = (propsIn: SvgProps) => React.ReactElement

type CustomInputProps = Parameters<typeof CustomTamaguiInput>[0]

interface Props extends CustomInputProps {
  leftIcon?: IconComponent | null
  rightIcon?: IconComponent | null
  ref?: React.Ref<TextInput>
  errorMessage?: string
  rightButton?: ({ children }: ButtonProps) => React.ReactNode
}

export type { Props as InputProps }

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
  ref,
  defaultValue,
  value = defaultValue,
  rightButton: RightButton = Fragment,
  ...props
}: Props) => {
  const hasLeftIcon = LeftIcon !== null
  const hasRightIcon = RightIcon !== null

  return (
    <YStack gap="$sm" width="100%">
      <XStack alignItems="center">
        {hasLeftIcon ? (
          <Stack position="absolute" zIndex={200} left={16}>
            <LeftIcon testID="left-icon" />
          </Stack>
        ) : null}
        <CustomTamaguiInput
          ref={ref}
          flex={1}
          {...(errorMessage && { borderColor: 'red', focusStyle: { borderColor: 'red' } })}
          {...props}
          defaultValue={value}
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
            <RightIcon />
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
