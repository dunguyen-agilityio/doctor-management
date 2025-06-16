import * as SecureStore from 'expo-secure-store'

import { setStorageItemAsync } from '../storage'

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}))

describe('setStorageItemAsync', () => {
  const key = 'test-key'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls deleteItemAsync if value is null', async () => {
    await setStorageItemAsync(key, null)
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(key)
    expect(SecureStore.setItemAsync).not.toHaveBeenCalled()
  })

  it('calls setItemAsync if value is not null', async () => {
    await setStorageItemAsync(key, 'test-value')
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, 'test-value')
    expect(SecureStore.deleteItemAsync).not.toHaveBeenCalled()
  })
})
