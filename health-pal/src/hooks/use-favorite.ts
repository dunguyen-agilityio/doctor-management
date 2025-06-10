import { useQuery } from '@tanstack/react-query'

import { fetchFavoritesByType } from '@app/services/favorite'

import { FAVORITE_TYPES } from '@app/types/favorite'

import { useFavoritesStore } from '@app/stores/favorite'

import { useRequireAuth } from './use-require-auth'

export const useFavoriteDoctors = () => {
  const { session } = useRequireAuth()
  const { id: userId } = session.user
  const setFavorite = useFavoritesStore((state) => state.setFavoriteDoctors)

  return useQuery({
    queryKey: ['favorites', FAVORITE_TYPES.DOCTOR, userId],
    queryFn: () => fetchFavoritesByType(userId, FAVORITE_TYPES.DOCTOR),
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
  const { session } = useRequireAuth()
  const { id: userId } = session.user
  const setFavorite = useFavoritesStore((state) => state.setFavoriteHospitals)

  return useQuery({
    queryKey: ['favorites', FAVORITE_TYPES.HOSPITAL, userId],
    staleTime: Infinity,
    queryFn: () => fetchFavoritesByType(userId, FAVORITE_TYPES.HOSPITAL),
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
