export const expo = {
  name: 'NutriGo',
  slug: 'nutrigo-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/adaptive-icon.png',
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
      backgroundColor: '#fff',
    },
    package: 'com.nutrigo.app',
    googleServicesFile: './google-services.json',
  },
  extra: {
    apiEndpoint: process.env.EXPO_PUBLIC_API_ENDPOINT,
    eas: {
      projectId: '4033c430-a4c0-44fc-adc0-47d1073fad39',
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
        image: './assets/images/splash-icon.png',
        imageWidth: 122,
      },
    ],
  ],
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  jsEngine: 'hermes',
  scheme: 'nutrigo',
  platforms: ['android'],
  experiments: {
    reactCompiler: !process.env.STORYBOOK_ENABLED,
  },
};
