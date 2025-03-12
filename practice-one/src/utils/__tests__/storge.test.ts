import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStorage } from '../storage';

// Adjust path

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('getStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mock calls between tests
  });

  it('returns parsed data when storage contains valid JSON', async () => {
    // Mock AsyncStorage.getItem to return a JSON string
    const mockData = { state: { favorites: ['1', '2'] } };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockData),
    );

    // Call getStorage with a generic type
    const result = await getStorage<{ state: { favorites: string[] } }>(
      'testKey',
    );

    // Assertions
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
    expect(result).toEqual(mockData);
  });

  it('returns null when storage is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const result = await getStorage<string>('testKey');

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
    expect(result).toBeNull();
  });

  it('handles invalid JSON gracefully by throwing an error', async () => {
    // Mock invalid JSON
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('invalid-json');

    // Expect JSON.parse to throw
    await expect(getStorage('testKey')).rejects.toThrow(SyntaxError);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  it('handles AsyncStorage errors by rejecting the promise', async () => {
    const mockError = new Error('Storage error');
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(mockError);

    await expect(getStorage('testKey')).rejects.toThrow('Storage error');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  it('types the result correctly with generic type', async () => {
    const mockData = { id: 1, name: 'Test' };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockData),
    );

    const result = await getStorage<{ id: number; name: string }>('testKey');

    expect(result).toEqual(mockData);
  });
});
