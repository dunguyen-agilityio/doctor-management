import { TDoctorData } from '@/models/doctor'
import { Hospital } from '@/models/hospital'
import { buildStrapiQuery } from '@/utils/strapi'

import { FAVORITE_QUERY_KEY } from '@/constants/favorite'

import { FAVORITE_TYPES } from '@/types/favorite'

import { getJwt } from './auth'
import { apiClient } from './http-client'

export type TFavorite<T extends FAVORITE_TYPES> = {
  type: T
  hospital: T extends FAVORITE_TYPES.DOCTOR ? null : Hospital
  doctor: T extends FAVORITE_TYPES.DOCTOR ? TDoctorData : null
  id: number
  documentId: string
}

export const removeFavorite = async (id: string) => {
  const jwt = await getJwt()
  const response = await apiClient.delete(`favorites/${id}`, {
    jwt,
  })

  return response
}

export const addFavorite = async (
  { itemId, type }: { itemId: number; type: FAVORITE_TYPES },
  userId: number,
) => {
  const jwt = await getJwt()
  const response = await apiClient.post('favorites', {
    jwt,
    body: {
      data: {
        [type === FAVORITE_TYPES.DOCTOR ? 'doctor' : 'hospital']: itemId,
        users_permissions_user: userId,
        type,
      },
    },
  })

  return response
}

export const fetchFavoritesByType = async <T extends FAVORITE_TYPES>(userId: number, type: T) => {
  const jwt = await getJwt()
  const searchParams = buildStrapiQuery({
    filters: [
      { key: 'filters[type][$eq]', query: type },
      {
        key: 'filters[users_permissions_user][id][$eq]',
        query: userId.toString(),
      },
      ...(type === FAVORITE_TYPES.HOSPITAL
        ? [{ key: FAVORITE_QUERY_KEY.hospital, query: 'url' }]
        : [
            { key: FAVORITE_QUERY_KEY.specialty, query: '*' },
            {
              key: FAVORITE_QUERY_KEY.doctor,
              query: 'url',
            },
            {
              key: FAVORITE_QUERY_KEY.address,
              query: 'address',
            },
          ]),
    ],
  })

  const response = await apiClient.get<{ data: TFavorite<T>[] }>(`favorites?${searchParams}`, {
    jwt,
  })

  return response.data
}
