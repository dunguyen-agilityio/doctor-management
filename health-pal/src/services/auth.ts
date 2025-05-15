import { AuthUser } from '@app/models/user'
import { LoginFormData, SignupFormData } from '@app/types'

import { apiClient } from './http-client'

export const login = async ({ email, password }: LoginFormData) => {
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

export const register = async (data: SignupFormData) => {
  const response = await apiClient.post<AuthUser>('auth/local/register', {
    body: data,
  })

  return response
}
