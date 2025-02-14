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
  // await new Promise((res) => setTimeout(res, 10000));
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

export const getFoodById = async (id: string) => {
  const data = await apiClient.get<IFood>(`${API_ENTITIES.FOODS}/${id}`);
  return data;
};

export const updateFood = async (food: IFood) => {
  const { id } = food;

  const newFood = await apiClient.put<IFood>(`${API_ENTITIES.FOODS}/${id}`, {
    body: food,
  });

  return newFood;
};
