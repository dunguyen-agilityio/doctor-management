export default {
  requestPermission: jest.fn(() => Promise.resolve(true)),
  displayNotification: jest.fn(() => Promise.resolve()),
  onForegroundEvent: jest.fn(),
  onBackgroundEvent: jest.fn(),
  createChannel: jest.fn(() => Promise.resolve('mock-channel')),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
};
