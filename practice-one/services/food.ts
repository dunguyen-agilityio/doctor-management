import { API_FOOD } from '@constants';
import { IFood } from '@types';
import { apiClient } from './http-client';

export interface FoodOptions {
  query: string;
  categories: number[];
}

export const getFoods = async ({
  categories,
  query,
}: FoodOptions): Promise<IFood[]> => {
  const searchParams = new URLSearchParams();

  if (query) {
    searchParams.set('like_name', query);
  }

  categories.forEach((item) => {
    searchParams.append('category', item.toString());
  });

  const response = apiClient.get<IFood[]>(
    `${API_FOOD}?${searchParams.toString()}`
  );

  return response;
};
