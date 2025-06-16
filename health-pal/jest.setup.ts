import '@shopify/flash-list/jestSetup'

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
