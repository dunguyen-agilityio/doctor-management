import { FAVORITE_TYPES } from '@app/types/favorite'
import { buildStrapiQuery } from '@app/utils/strapi'

import { apiClient } from './http-client'

export const getFavorite = async <T>(type1: FAVORITE_TYPES, jwt: string) => {
  const searchParams = buildStrapiQuery({
    filters: [{ key: 'type', query: type1 }],
  })

  const response = await apiClient.get<{ type: typeof type1; data: T[] }>(
    `favorites?${searchParams}`,
    {
      jwt,
    },
  )

  return response
}

export const deleteFavorite = async (id: string, jwt: string) => {
  const response = await apiClient.delete(`favorites/${id}`, {
    jwt,
  })

  return response
}

export const addFavorite = async (
  type: FAVORITE_TYPES,
  id: string,
  jwt: string,
  userId: number,
) => {
  const response = await apiClient.post('favorites', {
    jwt,
    body: {
      data: {
        [type]: id,
        users_permissions_user: userId,
      },
    },
  })

  return response
}
