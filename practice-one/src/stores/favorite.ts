import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { QUERY_KEYS } from '@/constants';

import { IFood } from '@/types';

export type FavoriteState = {
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
  fullString.toLowerCase().includes(query.toLowerCase());

export const useFavoriteStore = create<FavoriteState & FavoriteAction>(
  (set) => ({
    favorites: [],
    displayFavorites: [],

    addToFavorite: async (food: IFood) => {
      set((state) => {
        if (state.favorites.some(({ id }) => id === food.id)) {
          return {}; // Prevent duplicate entries
        }

        const newFavorites = [...state.favorites, food];
        const favoriteIds = newFavorites.map(({ id }) => id);

        AsyncStorage.setItem(
          QUERY_KEYS.FOOD_FAVORITE,
          JSON.stringify(favoriteIds),
        );

        return { favorites: newFavorites, displayFavorites: newFavorites };
      });
    },

    removeFromFavorite: async (foodId: string) => {
      set((state) => {
        const newFavorites = state.favorites.filter(({ id }) => id !== foodId);
        const favoriteIds = newFavorites.map(({ id }) => id);

        AsyncStorage.setItem(
          QUERY_KEYS.FOOD_FAVORITE,
          JSON.stringify(favoriteIds),
        );

        return { favorites: newFavorites, displayFavorites: newFavorites };
      });
    },

    setFavorites: (favorites) => {
      set({ favorites, displayFavorites: favorites });
    },

    searchByName: (name: string) => {
      set((state) => ({
        displayFavorites: name
          ? state.favorites.filter(({ name: fullName }) =>
              isLikeString(fullName, name),
            )
          : state.favorites,
      }));
    },
  }),
);
