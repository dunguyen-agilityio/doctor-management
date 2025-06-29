import { Text as TamaguiText, styled } from 'tamagui'

export const Text = styled(TamaguiText, {
  fontFamily: '$body',
  fontWeight: 400,
  color: '$primary',
  variants: {
    size: {
      extraSmall: {
        fontSize: '$xs',
        lineHeight: '$xs',
      },
      small: {
        fontSize: '$s',
        lineHeight: '$s',
      },
      medium: {
        fontSize: '$md',
        lineHeight: '$md',
      },
      large: {
        fontSize: '$lg',
        lineHeight: '$lg',
      },
      extraLarge: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
    },
  } as const,
  defaultVariants: { size: 'medium' },
})
