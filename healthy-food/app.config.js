export const expo = {
  name: 'NutriGo',
  slug: 'nutrigo-app',
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
    bundleIdentifier: 'com.nutrigo.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.nutrigo.app',
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
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png', // This path is relative to the root of your repo.png',
        imageWidth: 122,
      },
    ],
  ],
  newArchEnabled: true,
  jsEngine: 'hermes',
  scheme: 'nutrigo',
  experiments: {
    reactCompiler: !process.env.STORYBOOK_ENABLED,
  },
  platforms: ['android'],
};
