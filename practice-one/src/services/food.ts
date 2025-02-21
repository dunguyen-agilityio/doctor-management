import { API_ENTITIES, QUERY_KEYS } from '@/constants';

import { IFood } from '@/types';

import { apiClient } from './http-client';

export interface FoodOptions {
  query?: string;
  categories?: string[];
  favorite?: 0 | 1;
  queryKey?: string;
}

export const getFoods = async (options: FoodOptions = {}): Promise<IFood[]> => {
  const { categories = [], query, queryKey = QUERY_KEYS.FOOD } = options;
  const searchParams = new URLSearchParams();

  let url = API_ENTITIES.FOODS;

  if (query) {
    searchParams.set('name_like', query);
  }

  categories.forEach((item) => {
    searchParams.append('category', item.toString());
  });

  const isFavorite = queryKey === QUERY_KEYS.FOOD_FAVORITE;

  if (isFavorite) {
    url = API_ENTITIES.FAVORITES;
    searchParams.set('_expand', 'food');
  }

  const response = await apiClient.get(`${url}?${searchParams.toString()}`);

  if (isFavorite) {
    const favoriteFood = response as FavoriteFood[];
    const foods = favoriteFood.map(
      ({ food, id }) => ({ ...food, favorite: true, favoriteId: id }) as IFood,
    );

    return foods;
  }

  return response as IFood[];
};

type FavoriteFood = { id: string; food: IFood };

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
