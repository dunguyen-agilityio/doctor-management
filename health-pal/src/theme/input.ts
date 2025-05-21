import { Input as TamaguiInput, styled } from 'tamagui'

export const Input = styled(TamaguiInput, {
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

export type InputProps = Parameters<typeof Input>['0']
