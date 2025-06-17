import '@shopify/flash-list/jestSetup'

import { Dimensions, Keyboard } from 'react-native'

import 'react-native-gesture-handler/jestSetup'

require('react-native-reanimated').setUpTests()

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  return Reanimated
})

process.env.EXPO_PUBLIC_API_ENDPOINT = 'https://mock-api.com'
process.env.EXPO_PUBLIC_APP_TOKEN = 'mock_token'
global.fetch = jest.fn()

jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
  default: { isVisible: jest.fn(), dismiss: jest.fn() },
}))

jest.mock('react-native/Libraries/Components/Keyboard/KeyboardAvoidingView', () => ({
  default: ({ children }: React.PropsWithChildren) => children,
}))

Keyboard.addListener = jest.fn(() => ({
  remove: jest.fn(),
}))

Dimensions.get = jest.fn().mockReturnValue({ width: 375, height: 812 })

jest.mock('react-native/Libraries/Utilities/DevSettings', () => ({
  default: {
    addMenuItem: jest.fn(),
  },
}))

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  return class {
    addListener = jest.fn()
    removeAllListeners = jest.fn()
  }
})
