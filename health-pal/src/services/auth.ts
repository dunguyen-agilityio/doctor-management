import { AuthUser } from '@app/models/user'
import { AuthCredentials, UserProfileData } from '@app/types'

import dayjs from 'dayjs'

import { apiClient } from './http-client'

export const login = async ({ email, password }: AuthCredentials) => {
  const response = await apiClient.post<AuthUser>('auth/local', {
    body: { identifier: email, password },
  })

  return response
}

export const getProfile = async (jwt?: string) => {
  if (jwt) {
    return null
  }

  const response = await apiClient.get<AuthUser>('users/me?populate[avatar][fields][1]=url', {
    jwt,
  })

  return response
}

export const register = async ({ dateOfBirth, gender, nickname, ...data }: UserProfileData) => {
  const response = await apiClient.post<AuthUser>('auth/local/register', {
    body: {
      ...data,
      dateOfBirth: dayjs(dateOfBirth).format('YYYY-MM-DD'),
      gender: gender === 'female',
      username: nickname,
    },
  })

  return response
}
