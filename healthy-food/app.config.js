export const expo = {
  name: 'healthy-food',
  slug: 'healthy-food',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/logo.png',
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
      foregroundImage: './assets/images/logo.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.anonymous.app',
    googleServicesFile: './google-services.json',
  },
  extra: {
    apiEndpoint: process.env.EXPO_PUBLIC_API_ENDPOINT,
    eas: {
      projectId: 'bcc019da-17de-405a-b14d-b4f9b9462087',
    },
    storybook: process.env.STORYBOOK_ENABLED,
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
          enableProguardInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
    '@react-native-firebase/app',
  ],
  newArchEnabled: true,
  jsEngine: 'hermes',
  scheme: 'healthyfood',
  experiments: {
    reactCompiler: !process.env.STORYBOOK_ENABLED,
  },
  platforms: ['android'],
};
