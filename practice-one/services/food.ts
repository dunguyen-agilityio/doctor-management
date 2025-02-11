import { API_FOOD } from '@constants';
import { IFood } from '@types';
import { apiClient } from './http-client';

export interface FoodOptions {
  query?: string;
  categories?: number[];
  favorite?: 0 | 1;
}

export const getFoods = async ({
  categories = [],
  query,
  favorite,
}: FoodOptions): Promise<IFood[]> => {
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
    `${API_FOOD}?${searchParams.toString()}`,
  );

  return response;
};
