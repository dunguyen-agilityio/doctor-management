import { Button as TamaguiButton, styled } from 'tamagui'

export const Button = styled(TamaguiButton, {
  fontFamily: '$body',
  fontWeight: '500',
  fontSize: '$s',
  disabledStyle: { opacity: 0.75, backgroundColor: '$grey900' },
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
        borderRadius: '$6',
        height: 48,
        paddingVertical: 12,
        paddingHorizontal: 20,
        pressStyle: { backgroundColor: '$primary' },
        hoverStyle: { opacity: 0.85 },
      },
      outlined: {
        color: '$primary',
        backgroundColor: 'transparent',
        py: 10,
        borderWidth: 1,
        borderColor: '$grey200',
        borderRadius: '$1',
        height: 40,
      },
    },
    full: {
      true: { minWidth: '100%' },
    },
  } as const,
  defaultVariants: { variant: 'primary' },
})
