import { defaultConfig } from '@tamagui/config/v4'
import { createFont, createTamagui, createTokens } from 'tamagui'

const systemFont = createFont({
  family: 'System',
  size: {
    xs: 12,
    s: 14,
    md: 16,
    true: 16,
    lg: 18,
    xl: 20,
  },
  lineHeight: {
    xs: 18,
    s: 21,
    md: 24,
    true: 24,
    lg: 27,
    xl: 30,
  },
  weight: {
    1: '400',
    2: '500',
    3: '600',
    4: '700',
    true: 400,
  },
  face: {
    400: { normal: 'Inter_400Regular' },
    500: { normal: 'Inter_500Medium' },
    600: { normal: 'Inter_600SemiBold' },
    700: { normal: 'Inter_700Bold' },
  },
})

export const tokens = createTokens({
  size: { 1: 12, 2: 14, 3: 16, true: 16, 4: 18, 5: 20 },
  space: { sm: 8, true: 8, md: 24 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  radius: {
    0: 0,
    1: 8,
    2: 16,
    3: 45,
    4: 50,
    5: 55,
    6: 60,
  },
  color: {
    primary: '#1c2a3a',
    white: '#ffffff',
    grey50: '#f9fafb',
    grey100: '#f3f4f6',
    grey200: '#e5e7eb',
    grey300: '#d1d5db',
    grey400: '#9ca3af',
    grey500: '#6b7280',
    grey600: '#374151',
    grey800: '#1f2a37',
    grey900: '#111928',
    deepTeal: '#014737',
    teal: '#4d9b91',
    lightTeal: '#a4cfc3',
    green: '#93c19e',
    paleGreen: '#def7e4',
    darkRed: '#771d1d',
    deepPink: '#dc9497',
    pink: '#deb6b5',
    lightPink: '#fde8e8',
    lightPurple: '#aca1cd',
    blue: '#1c64f2',
    paleBlue: '#89ccdb',
    purple: '#352261',
    orange: '#f5ad7e',
    black: '#000',
    gray: '#292d32',
  },
})

export const tamaguiConfig = createTamagui({
  fonts: { heading: systemFont, body: systemFont },
  tokens,
  themes: {
    light: {
      ...defaultConfig.themes.light,
      ...tokens.color,
      bg: tokens.color.white,
      color: tokens.color.primary,
    },
  },
  shorthands: {
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    f: 'flex',
    m: 'margin',
    w: 'width',
    h: 'height',
  } as const,
  animations: defaultConfig.animations,
  media: defaultConfig.media,
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
