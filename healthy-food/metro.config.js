const { mergeConfig } = require('@react-native/metro-config');
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      // This will lazily load modules when they're evaluated, leading to faster startup times
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        // The option below removes all console logs statements in production.
        drop_console: true,
      },
    },
  },
};
// set your own config here 👆

let finalConfig = mergeConfig(defaultConfig, config);

module.exports = wrapWithReanimatedMetroConfig(
  withStorybook(finalConfig, {
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  }),
);
