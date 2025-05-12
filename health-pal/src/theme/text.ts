import { styled, Text as TamaguiText } from 'tamagui'

// Text Component with Variants
export const Text = styled(TamaguiText, {
  fontFamily: '$body',
  fontWeight: 400,
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
    color: {
      primary: { color: '$primary' },
      secondary: { color: '$white' },
      muted: { color: '$blue' },
    },
  } as const,
  defaultVariants: { size: 'medium', color: 'primary' },
})
