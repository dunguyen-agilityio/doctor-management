import { useEffect, useState } from 'react';

import { IFood } from '@types';
import { fetchData } from '@utils';
import { API_FOOD } from '@constants';
import { FoodOptions, getFoods } from '@services/food';
import { useQuery } from '@tanstack/react-query';

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
  const [options, setOptions] = useState<FoodOptions>({
    categories: [],
    query: '',
  });

  const query = useQuery({
    queryKey: ['foods'],
    queryFn: () => {
      console.log('called');
      return getFoods(options);
    },
  });

  return { ...query, options, setOptions };
}
