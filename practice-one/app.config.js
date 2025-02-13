export const expo = {
  name: 'app',
  slug: 'app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/logo.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icons/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/icons/favicon.png',
  },
  extra: {
    apiEndpoint: process.env.API_ENDPOINT,
    storybook: false,
  },
  plugins: [
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Manrope.ttf', './assets/fonts/Signika.ttf'],
      },
    ],
  ],
  newArchEnabled: true,
};
