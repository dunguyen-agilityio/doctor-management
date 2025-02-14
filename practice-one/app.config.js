export const expo = {
  name: 'app',
  slug: 'app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/logo.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/images/logo.png',
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
      foregroundImage: './src/assets/icons/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.anonymous.app',
  },
  web: {
    favicon: './src/assets/icons/favicon.png',
  },
  extra: {
    apiEndpoint: process.env.API_ENDPOINT,
    storybook: false,
  },
  plugins: [
    'expo-dev-menu',
    [
      'expo-font',
      {
        fonts: [
          './src/assets/fonts/Manrope.ttf',
          './src/assets/fonts/Signika.ttf',
        ],
      },
    ],
  ],
  newArchEnabled: true,
};
