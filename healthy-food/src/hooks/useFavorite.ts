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
    refetchOnMount: false,
    queryFn: async () => {
      try {
        const storage = await getStorage<{ state: { favorites: [] } }>(
          QUERY_KEYS.FAVORITE_FOOD,
        );

        if (storage) {
          const response = await getFavoriteFoodList(storage.state.favorites);
          setFavorites(response);
          return response;
        }
      } catch (error) {
        console.error('Failed to initialize favorites:', error);
      }

      return [];
    },
  });

  return { ...query, ...store };
};
