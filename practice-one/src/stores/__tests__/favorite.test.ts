import { useFavoriteStore } from '@/stores/favorite';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { QUERY_KEYS } from '@/constants';

import { IFood } from '@/types';

import { MOCK_FOOD_LIST } from '@/mocks/food';

const mockFood: IFood = MOCK_FOOD_LIST[0];
const mockFood2: IFood = MOCK_FOOD_LIST[1];

describe('useFavoriteStore', () => {
  afterEach(() => {
    useFavoriteStore.setState({ favorites: [] });
    (AsyncStorage.setItem as jest.Mock).mockClear();
  });

  it('should add a food item to favorites', async () => {
    const { addToFavorite } = useFavoriteStore.getState();
    addToFavorite(mockFood);

    expect(useFavoriteStore.getState().favorites).toContainEqual(mockFood);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify([mockFood.id]),
    );
  });

  it('should remove a food item from favorites', async () => {
    const { addToFavorite, removeFromFavorite } = useFavoriteStore.getState();

    addToFavorite(mockFood);
    addToFavorite(mockFood2);
    removeFromFavorite(mockFood.id);

    expect(useFavoriteStore.getState().favorites).not.toContainEqual(mockFood);
    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(
      1,
      QUERY_KEYS.FOOD_FAVORITE,
      JSON.stringify([mockFood.id]),
    );
    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(
      2,
      QUERY_KEYS.FOOD_FAVORITE,
      JSON.stringify([mockFood.id, mockFood2.id]),
    );
    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(
      3,
      QUERY_KEYS.FOOD_FAVORITE,
      JSON.stringify([mockFood2.id]),
    );
  });

  it('should prevent duplicate entries', async () => {
    const { addToFavorite } = useFavoriteStore.getState();

    addToFavorite(mockFood);
    addToFavorite(mockFood);

    expect(useFavoriteStore.getState().favorites.length).toBe(1);
  });

  it('should search for favorites by name', async () => {
    const { addToFavorite, searchByName } = useFavoriteStore.getState();

    addToFavorite(mockFood);
    addToFavorite(mockFood2);
    searchByName('Pizza');

    expect(useFavoriteStore.getState().displayFavorites).toEqual([mockFood]);
  });

  it('should reset search results when cleared', async () => {
    const { searchByName } = useFavoriteStore.getState();

    searchByName('');

    expect(useFavoriteStore.getState().displayFavorites).toEqual(
      useFavoriteStore.getState().favorites,
    );
  });

  it('should set favorites and update displayFavorites', async () => {
    const { setFavorites } = useFavoriteStore.getState();

    setFavorites([mockFood, mockFood2]);

    expect(useFavoriteStore.getState().favorites).toEqual([
      mockFood,
      mockFood2,
    ]);
    expect(useFavoriteStore.getState().displayFavorites).toEqual([
      mockFood,
      mockFood2,
    ]);
  });
});
