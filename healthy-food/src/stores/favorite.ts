import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { QUERY_KEYS } from '@/constants';

import { IFood } from '@/types';

type FavoriteState = {
  favorites: IFood[];
  displayFavorites: IFood[];
};

type FavoriteAction = {
  addToFavorite: (food: IFood) => void;
  removeFromFavorite: (foodId: string) => void;
  setFavorites: (data: IFood[]) => void;
  searchByName: (name: string) => void;
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
