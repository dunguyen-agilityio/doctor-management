import { useQuery } from '@tanstack/react-query'

import { useRequireAuth } from '@app/contexts'
import { fetchFavoritesByType } from '@app/services/favorite'
import { useFavoritesStore } from '@app/stores/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

export const useFavoriteDoctors = () => {
  const { jwt, user } = useRequireAuth().session
  const { id: userId } = user
  const setFavorite = useFavoritesStore((state) => state.setFavoriteDoctors)

  return useQuery({
    queryKey: ['favorites', FAVORITE_TYPES.DOCTOR, userId],
    queryFn: () => fetchFavoritesByType(userId, jwt, FAVORITE_TYPES.DOCTOR),
    staleTime: Infinity,
    select: (data) => {
      const byId = data.reduce(
        (prev, current) => ({ ...prev, [current.doctor.id]: current.documentId }),
        {},
      )

      setFavorite(byId)

      return data.map((fav) => ({ ...fav.doctor, favoriteId: fav.documentId }))
    },
  })
}

export const useFavoriteHospitals = () => {
  const { jwt, user } = useRequireAuth().session
  const { id: userId } = user
  const setFavorite = useFavoritesStore((state) => state.setFavoriteHospitals)

  return useQuery({
    queryKey: ['favorites', FAVORITE_TYPES.HOSPITAL, userId],
    staleTime: Infinity,
    queryFn: () => fetchFavoritesByType(userId, jwt, FAVORITE_TYPES.HOSPITAL),
    select: (data) => {
      const byId = data.reduce(
        (prev, current) => ({ ...prev, [current.hospital.id]: current.documentId }),
        {},
      )

      setFavorite(byId)

      return data.map((fav) => ({ ...fav.hospital, favoriteId: fav.documentId }))
    },
  })
}
