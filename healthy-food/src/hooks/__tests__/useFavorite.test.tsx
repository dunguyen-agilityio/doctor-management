import { useFavoriteStore } from '@/stores/favorite';

import { QUERY_KEYS } from '@/constants';

import { getFavoriteFoodList } from '@/services/food';

import { getStorage } from '@/utils/storage';
import { renderHook, waitFor } from '@/utils/test-utils';

import { useFavorite } from '../useFavorite';

// Mock dependencies
jest.mock('@/stores/favorite', () => ({
  useFavoriteStore: jest.fn(),
}));

jest.mock('@/utils/storage', () => ({
  getStorage: jest.fn(),
}));

jest.mock('@/services/food', () => ({
  getFavoriteFoodList: jest.fn(),
}));

describe('useFavorite hook', () => {
  let mockSetFavorites: jest.Mock;

  beforeEach(() => {
    // Reset mocks and query cache
    jest.clearAllMocks();

    // Mock Zustand store
    mockSetFavorites = jest.fn();
    (useFavoriteStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      displayFavorites: [],
      setFavorites: mockSetFavorites,
      addToFavorite: jest.fn(),
      removeFromFavorite: jest.fn(),
      searchByName: jest.fn(),
    });
  });

  it('fetches favorites from storage and API, updates store', async () => {
    // Mock storage data
    const mockStorage = { state: { favorites: ['1', '2'] } };
    (getStorage as jest.Mock).mockResolvedValue(mockStorage);

    // Mock API response
    const mockResponse = [
      { id: '1', name: 'Pizza' },
      { id: '2', name: 'Burger' },
    ];
    (getFavoriteFoodList as jest.Mock).mockResolvedValue(mockResponse);

    // Render hook
    const { result } = renderHook(() => useFavorite());

    // Initial state
    expect(result.current.isLoading).toBe(true);

    // Wait for query to resolve
    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 2000,
    });

    // Verify results
    expect(getStorage).toHaveBeenCalledWith(QUERY_KEYS.FAVORITE_FOOD);
    expect(getFavoriteFoodList).toHaveBeenCalledWith(['1', '2']);
    expect(mockSetFavorites).toHaveBeenCalledWith(mockResponse);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.favorites).toEqual([]); // Store state not updated in result.current
    expect(result.current.setFavorites).toBe(mockSetFavorites);
  });

  it('returns empty array when storage is null', async () => {
    (getStorage as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getStorage).toHaveBeenCalledWith(QUERY_KEYS.FAVORITE_FOOD);
    expect(getFavoriteFoodList).not.toHaveBeenCalled();
    expect(mockSetFavorites).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]);
  });

  it('handles API error gracefully', async () => {
    const mockStorage = { state: { favorites: ['1'] } };
    (getStorage as jest.Mock).mockResolvedValue(mockStorage);
    (getFavoriteFoodList as jest.Mock).mockRejectedValue(
      new Error('API Error'),
    );

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => expect(result.current.isSuccess).toBe(true)); // Success with fallback data

    expect(getStorage).toHaveBeenCalled();
    expect(getFavoriteFoodList).toHaveBeenCalledWith(['1']);
    expect(mockSetFavorites).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]); // Fallback to empty array
  });

  it('does not refetch on mount when refetchOnMount is false', async () => {
    (getStorage as jest.Mock).mockResolvedValue(null);

    const { result, rerender } = renderHook(() => useFavorite());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Rerender to simulate remount
    rerender({});

    // Should not call getStorage again due to refetchOnMount: false
    expect(getStorage).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual([]);
  });

  it('combines query and store properties', async () => {
    (getStorage as jest.Mock).mockResolvedValue(null);
    const mockStore = {
      favorites: [{ id: '3', name: 'Sushi' }],
      displayFavorites: [],
      setFavorites: mockSetFavorites,
      addToFavorite: jest.fn(),
      removeFromFavorite: jest.fn(),
      searchByName: jest.fn(),
    };
    (useFavoriteStore as unknown as jest.Mock).mockReturnValue(mockStore);

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
    expect(result.current.favorites).toEqual(mockStore.favorites);
    expect(result.current.setFavorites).toBe(mockSetFavorites);
    expect(result.current.addToFavorite).toBe(mockStore.addToFavorite);
  });
});
