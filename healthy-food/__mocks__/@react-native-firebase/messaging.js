export default () => ({
  requestPermission: jest.fn(() => Promise.resolve(true)),
  getToken: jest.fn(() => Promise.resolve('mock-token')),
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  setBackgroundMessageHandler: jest.fn(),
  onTokenRefresh: jest.fn(),
});
