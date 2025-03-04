import { useFavoriteStore } from '@/stores/favorite';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants';

import { getFavoriteFoodList } from '@/services/food';

import { getStorage } from '@/utils/storage';

export const useFavorite = () => {
  const store = useFavoriteStore();
  const { setFavorites } = store;

  const query = useQuery({
    queryKey: [QUERY_KEYS.FAVORITE_FOOD],
    queryFn: async () => {
      const favorites = await getStorage<string[]>(QUERY_KEYS.FAVORITE_FOOD);

      if (!favorites) return [];

      const response = await getFavoriteFoodList(favorites);
      setFavorites(response);
      return response;
    },
  });

  return { ...query, ...store };
};
