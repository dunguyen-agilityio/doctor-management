import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { QUERY_KEYS } from '@/constants';

import { IFood } from '@/types';

import { getFavoriteFoodList } from '@/services/food';

type FavoriteState = {
  favorites: IFood[];
  displayFavorites: IFood[];
};

type FavoriteAction = {
  addToFavorite: (food: IFood) => void;
  removeFromFavorite: (foodId: string) => void;
  setFavorites: (data: IFood[]) => void;
  searchByName: (name: string) => void;
  initialize: () => Promise<void>;
};

const isLikeString = (fullString: string, query: string) =>
  fullString.toLowerCase().includes(query.toLowerCase().trim());

export const useFavoriteStore = create<FavoriteState & FavoriteAction>()(
  persist(
    (set) => ({
      favorites: [],
      displayFavorites: [],

      addToFavorite: (food) => {
        set((state) => {
          if (!food?.id || state.favorites.some((f) => f.id === food.id)) {
            return state; // No change if invalid or duplicate
          }
          const newFavorites = [...state.favorites, food];
          return {
            favorites: newFavorites,
            displayFavorites: newFavorites,
          };
        });
      },

      removeFromFavorite: (foodId) => {
        if (!foodId) return; // Guard against invalid ID
        set((state) => {
          const newFavorites = state.favorites.filter((f) => f.id !== foodId);
          return {
            favorites: newFavorites,
            displayFavorites: newFavorites,
          };
        });
      },

      setFavorites: (favorites) => {
        set({ favorites, displayFavorites: favorites });
      },

      searchByName: (name) => {
        set((state) => ({
          displayFavorites: name
            ? state.favorites.filter((f) => isLikeString(f.name || '', name))
            : state.favorites,
        }));
      },

      initialize: async () => {
        try {
          const storedIds = await AsyncStorage.getItem(
            QUERY_KEYS.FAVORITE_FOOD,
          );
          if (storedIds) {
            const { state }: { state: { favorites: [] } } =
              JSON.parse(storedIds);

            const response = await getFavoriteFoodList(state.favorites);
            set({ favorites: response, displayFavorites: response });
          }
        } catch (error) {
          console.error('Failed to initialize favorites:', error);
        }
      },
    }),
    {
      name: QUERY_KEYS.FAVORITE_FOOD, // Storage key
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
      partialize: (state) => ({
        favorites: state.favorites.map(({ id }) => id), // Store only IDs
      }),
    },
  ),
);
