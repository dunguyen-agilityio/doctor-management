import { styled, Text as TamaguiText } from 'tamagui'

// Text Component with Variants
export const Heading = styled(TamaguiText, {
  fontFamily: '$heading',
  fontWeight: '700',
  variants: {
    size: {
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
        fontWeight: '600',
      },
      extraLarge: {
        fontSize: '$xl',
        lineHeight: '$xl',
        fontWeight: '400',
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
