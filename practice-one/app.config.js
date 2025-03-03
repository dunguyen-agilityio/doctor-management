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
    bundleIdentifier: 'com.anonymous.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icons/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.anonymous.app',
  },
  web: {
    favicon: './assets/icons/favicon.png',
  },
  extra: {
    apiEndpoint: process.env.EXPO_PUBLIC_API_ENDPOINT,
    storybook: false,
    eas: {
      projectId: '76e99b1c-d747-4d86-8dd2-b546b1426373',
    },
  },
  plugins: [
    'expo-dev-menu',
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Manrope.ttf', './assets/fonts/Signika.ttf'],
      },
    ],
    [
      'expo-dev-client',
      {
        launchMode: 'most-recent',
      },
    ],
  ],
  newArchEnabled: true,
  jsEngine: 'hermes',
};
