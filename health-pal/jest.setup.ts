process.env.EXPO_PUBLIC_API_ENDPOINT = 'https://mock-api.com'
process.env.EXPO_PUBLIC_APP_TOKEN = 'mock_token'
// Optional global mocks
global.fetch = jest.fn()

jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
  default: { isVisible: jest.fn(), dismiss: jest.fn() },
}))
