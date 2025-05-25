const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')
const withStorybook = require('@storybook/react-native/metro/withStorybook')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // transformer: {
  //   getTransformOptions: async () => ({
  //     transform: {
  //       experimentalImportSupport: true,
  //       inlineRequires: true,
  //     },
  //   }),
  //   minifierPath: 'metro-minify-terser',
  //   minifierConfig: {
  //     compress: {
  //       drop_console: true,
  //     },
  //   },
  // },
})

config.resolver.sourceExts.push('mjs')

module.exports = withStorybook(config, {
  enabled: __DEV__ && process.env.EXPO_PUBLIC_STORYBOOK_ENABLED,
  configPath: path.resolve(__dirname, './.storybook'),
})
