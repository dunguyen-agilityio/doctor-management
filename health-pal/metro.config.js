const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        drop_console: true,
      },
    },
  },
})

config.resolver.sourceExts.push('mjs')

let finalConfig = config

if (process.env.NODE_ENV !== 'production' && process.env.EXPO_PUBLIC_STORYBOOK_ENABLED) {
  const withStorybook = require('@storybook/react-native/metro/withStorybook')

  finalConfig = withStorybook(config, {
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  })
}

module.exports = finalConfig
