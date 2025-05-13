import { styled, Text as TamaguiText } from 'tamagui'

// Text Component with Variants
export const Heading = styled(TamaguiText, {
  fontFamily: '$heading',
  fontWeight: '700',
  color: '$primary',
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
      },
      extraLarge: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
    },
  } as const,
  defaultVariants: { size: 'medium' },
})
