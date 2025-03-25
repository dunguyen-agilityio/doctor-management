import { API_ENTITIES, HORIZONTAL_PAGE_SIZE } from '@/constants';

import { IFood } from '@/types';

import { apiClient } from './http-client';

export interface FoodOptions {
  query?: string;
  filters?: string[];
  page?: number;
  pageSize?: number;
  queryKey?: string;
}

type TGetFoodListResponse = {
  data: IFood[];
  hasMore?: boolean;
  nextPage?: number;
  prevPage?: number;
};

export const getFoodList = async ({
  filters = [],
  page = 1,
  pageSize = HORIZONTAL_PAGE_SIZE,
  query,
}: FoodOptions): Promise<TGetFoodListResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.set('_page', String(page));
  searchParams.set('_limit', String(pageSize));

  if (query) searchParams.set('name_like', query);

  filters.forEach((item) => searchParams.append('category', item.toString()));

  const url = `${API_ENTITIES.FOOD_LIST}?${searchParams.toString()}`;

  const { data, meta } = await apiClient.get<IFood[]>(url);

  const totalItems = meta?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    hasMore: page < totalPages,
    nextPage: page < totalPages ? page + 1 : undefined,
    prevPage: page > 1 ? page - 1 : undefined,
  };
};

export const getFavoriteFoodList = async (ids: string[]): Promise<IFood[]> => {
  if (!ids.length) return [];

  const searchParams = new URLSearchParams();
  ids.forEach((item) => searchParams.append('id', item.toString()));

  const url = `${API_ENTITIES.FOOD_LIST}?${searchParams.toString()}`;

  const { data } = await apiClient.get<IFood[]>(url);
  return data;
};

export const getFoodById = async (id: string): Promise<IFood> => {
  const { data: food } = await apiClient.get<IFood>(
    `${API_ENTITIES.FOOD_LIST}/${id}`,
  );

  return food;
};
