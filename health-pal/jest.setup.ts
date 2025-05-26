// jest.setup.ts
process.env.EXPO_PUBLIC_DEV_API_ENDPOINT = 'https://mock-api.com'
process.env.EXPO_PUBLIC_APP_TOKEN = 'mock_token'

// Optional global mocks
global.fetch = jest.fn()
