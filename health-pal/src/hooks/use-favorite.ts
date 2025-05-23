import { use } from 'react'

import { useQuery } from '@tanstack/react-query'

import { FavoriteDispatchContext } from '@app/contexts/favorite'
import { fetchFavoritesByType } from '@app/services/favorite'
import { FAVORITE_TYPES } from '@app/types/favorite'

export const useFavoriteDoctors = (userId: number, jwt: string) => {
  const setFavorite = use(FavoriteDispatchContext)

  return useQuery({
    queryKey: ['favorites', FAVORITE_TYPES.DOCTOR, userId],
    queryFn: () => fetchFavoritesByType(userId, jwt, FAVORITE_TYPES.DOCTOR),
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

export const useFavoriteHospitals = (userId: number, jwt: string) => {
  const setFavorite = use(FavoriteDispatchContext)

  return useQuery({
    queryKey: ['favorites', FAVORITE_TYPES.HOSPITAL, userId],
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
