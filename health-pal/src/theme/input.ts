import { styled, Input as TamaguiInput } from 'tamagui'

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
    },
  } as const,
  defaultVariants: { variant: 'flat' },
})
