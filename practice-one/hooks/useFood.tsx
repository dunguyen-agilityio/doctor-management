import { useCallback, useEffect, useState } from 'react';

import { IFood } from '@types';
import { fetchData } from '@utils';
import { API_FOOD } from '@constants';

export interface FoodOptions {
  name: string;
  categories: number[];
}

export function useFood(id: number) {
  const [data, setData] = useState<IFood | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const data = await fetchData<IFood>({ url: `${API_FOOD}/${id}` });
        setData(data);
      } catch (error) {
        setError(new Error('Failed to fetch data.'));
      }
      setLoading(false);
    }
    getData();
  }, [id]);

  async function addFavorite(id: number) {
    try {
      const food = await fetchData<IFood>({ url: `${API_FOOD}/${id}` });
      if (food && food.favorite === 0) {
        const newFood = await fetchData<IFood>({
          url: `foods/${id}`,
          method: 'PUT',
          body: { ...food, favorite: 1 },
        });
        return newFood;
      }
    } catch (error) {
      setError(new Error('Failed to fetch data.'));
    }
  }

  async function removeFavorite(id: number) {
    try {
      const food = await fetchData<IFood>({ url: `${API_FOOD}/${id}` });
      if (food && food.favorite === 1) {
        const newFood = await fetchData<IFood>({
          url: `foods/${id}`,
          method: 'PUT',
          body: { ...food, favorite: 0 },
        });
        return newFood;
      }
    } catch (error) {
      setError(new Error('Failed to fetch data.'));
    }
  }

  return {
    data,
    loading,
    error,
    removeFavorite,
    addFavorite,
  };
}

export function useFoods() {
  const [reload, setReload] = useState(false);
  const [data, setData] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [query, setQuery] = useState<FoodOptions>({ categories: [], name: '' });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const { categories, name } = query;
        const searchParams = new URLSearchParams();

        if (name) {
          searchParams.set('name_like', name);
        }

        categories.forEach((item) => {
          searchParams.append('category', item.toString());
        });

        const data = await fetchData<IFood[]>({
          url: `${API_FOOD}?${searchParams.toString()}`,
        });

        setData(data);
      } catch (error) {
        setError(new Error('Failed to fetch data.'));
      }

      setLoading(false);
    }

    getData();
  }, [query, reload]);

  const fetch = useCallback(() => setReload((prev) => !prev), []);

  return {
    data,
    loading,
    error,
    query,
    setQuery,
    fetch,
  };
}
