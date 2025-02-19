import { API_ENTITIES } from '@/constants';

import { IFood } from '@/types';

import { apiClient } from './http-client';

export interface FoodOptions {
  query?: string;
  categories?: string[];
  favorite?: 0 | 1;
  queryKey?: string;
}

export const getFoods = async (options: FoodOptions = {}): Promise<IFood[]> => {
  const { categories = [], query, favorite } = options;
  const searchParams = new URLSearchParams();

  if (query) {
    searchParams.set('name_like', query);
  }

  categories.forEach((item) => {
    searchParams.append('category', item.toString());
  });

  if (favorite !== undefined) {
    searchParams.set('favorite', favorite + '');
  }

  const response = await apiClient.get<IFood[]>(
    `${API_ENTITIES.FOODS}?${searchParams.toString()}`,
  );

  return response;
};

type FavoriteFood = { id: string; food: IFood };

export const getFavoriteFoods = async (
  options: FoodOptions = {},
): Promise<IFood[]> => {
  const { query } = options;
  const searchParams = new URLSearchParams();

  searchParams.set('_expand', 'food');

  if (query) {
    searchParams.set('name_like', query);
  }

  const response = await apiClient.get<FavoriteFood[]>(
    `${API_ENTITIES.FAVORITES}?${searchParams.toString()}`,
  );

  const foods = response.map(
    ({ food, id }) => ({ ...food, favorite: true, favoriteId: id }) as IFood,
  );

  return foods;
};

type FoodWithFavoritesResponse = IFood & { favorites: [{ id: string }] };

export const getFoodById = async (id: string): Promise<IFood> => {
  const { favorites, ...rest } = await apiClient.get<FoodWithFavoritesResponse>(
    `${API_ENTITIES.FOODS}/${id}?_embed=favorites`,
  );

  if (!favorites.length) return rest;

  const [{ id: favoriteId }] = favorites;
  return { ...rest, favorite: !!favoriteId, favoriteId };
};

export const addFoodToFavorite = async (id: string) => {
  const newFavorite = await apiClient.post<IFood>(
    `${API_ENTITIES.FAVORITES}?_expand=food`,
    {
      body: { foodId: id },
    },
  );

  return newFavorite;
};

export const removeFoodToFavorite = async (id: string) => {
  await apiClient.delete(`${API_ENTITIES.FAVORITES}/${id}`, {
    body: { foodId: id },
  });
};
