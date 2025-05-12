import { styled, Button as TamaguiButton } from 'tamagui'

export const Button = styled(TamaguiButton, {
  fontFamily: '$body',
  fontWeight: '500',
  fontSize: '$md',
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
        borderRadius: '$6',
        height: 48,
        paddingVertical: 12,
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
