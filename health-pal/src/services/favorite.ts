import { Clinic } from '@app/models/clinic'
import { FAVORITE_TYPES, TFavorite } from '@app/types/favorite'
import { buildStrapiQuery } from '@app/utils/strapi'

import { DoctorData } from './doctor'
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

export const getDoctorFavorite = async (jwt: string) => {
  const searchParams = buildStrapiQuery({
    filters: [
      { key: 'populate[doctor][populate][users_permissions_user][populate]', query: 'avatar' },
      { key: 'populate[doctor][populate][clinic][populate]', query: 'image' },
    ],
  })

  const response = await apiClient.get<{ data: TFavorite<DoctorData>[] }>(
    `doctor-favorites?${searchParams}`,
    {
      jwt,
    },
  )

  return response
}

export const getClinicFavorite = async (jwt: string) => {
  const response = await apiClient.get<{ data: TFavorite<Clinic>[] }>('hospital-favorites', {
    jwt,
  })

  return response
}

export const deleteDoctorFavorite = async (id: string, jwt: string) => {
  const response = await apiClient.delete(`doctor-favorites/${id}`, {
    jwt,
  })

  return response
}

export const deleteClinicFavorite = async (id: string, jwt: string) => {
  const response = await apiClient.delete(`hospital-favorites/${id}`, {
    jwt,
  })

  return response
}

export const addDoctorFavorite = async (doctorId: number, userId: number, jwt: string) => {
  const response = await apiClient.post('doctor-favorites', {
    jwt,
    body: {
      data: {
        doctor: doctorId,
        users_permissions_user: userId,
      },
    },
  })

  return response
}

export const addClinicFavorite = async (clinicId: number, userId: number, jwt: string) => {
  const response = await apiClient.post('hospital-favorites', {
    jwt,
    body: {
      data: {
        hospital: clinicId,
        users_permissions_user: userId,
      },
    },
  })

  return response
}
