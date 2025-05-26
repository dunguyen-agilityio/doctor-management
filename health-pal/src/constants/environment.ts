export const API_ENDPOINT =
  process.env[__DEV__ ? 'EXPO_PUBLIC_DEV_API_ENDPOINT' : 'EXPO_PUBLIC_API_ENDPOINT']!

export const APP_TOKEN = process.env.EXPO_PUBLIC_APP_TOKEN!
