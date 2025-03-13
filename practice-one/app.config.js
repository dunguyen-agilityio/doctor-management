export const expo = {
  name: 'healthy-food',
  slug: 'healthy-food',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/logo.png',
    backgroundColor: '#ffffff',
    resizeMode: 'contain',
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
    googleServicesFile: './google-services.json',
  },
  web: {
    favicon: './assets/icons/favicon.png',
  },
  extra: {
    apiEndpoint: process.env.EXPO_PUBLIC_API_ENDPOINT,
    storybook: false,
    eas: {
      projectId: 'bcc019da-17de-405a-b14d-b4f9b9462087',
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
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: [
            '../../node_modules/@notifee/react-native/android/libs',
          ],
        },
      },
    ],
    '@react-native-firebase/app',
  ],
  newArchEnabled: true,
  jsEngine: 'hermes',
  scheme: 'healthy-food',
};
