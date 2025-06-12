import type { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '@testing-library/jest-native/extend-expect'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|jest-expo|lodash|@react-native(-community)?)|tamagui|@tamagui|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/mocks/**',
    '!src/**/types/**',
    '!src/**/theme/**',
    '!src/**/models/**',
    '!src/**/icons/**',
    '!src/**/constants/**',
  ],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '!**/*.stories.[jt]s?(x)'],
}

export default config
