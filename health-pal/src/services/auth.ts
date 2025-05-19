import dayjs from 'dayjs'

import { AuthUser } from '@app/models/user'
import { AuthCredentials, UserProfileData } from '@app/types'

import { APIResponse, apiClient } from './http-client'

export const login = async ({
  email,
  password,
}: AuthCredentials): Promise<APIResponse<AuthUser>> => {
  try {
    const response = await apiClient.post<AuthUser>('auth/local', {
      body: { identifier: email, password },
    })

    return { data: response, error: null }
  } catch (error) {
    let messsage = 'Failed to login!'

    if (error instanceof Error) {
      messsage = error.message
    }

    return { data: null, error: new Error(messsage) }
  }
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

export const register = async ({
  dateOfBirth,
  gender,
  nickname,
  ...data
}: UserProfileData): Promise<APIResponse<AuthUser>> => {
  try {
    const response = await apiClient.post<AuthUser>('auth/local/register', {
      body: {
        ...data,
        dateOfBirth: dayjs(dateOfBirth).format('YYYY-MM-DD'),
        gender: gender === 'female',
        username: nickname,
      },
    })

    return { data: response, error: null }
  } catch (error) {
    let messsage = 'Failed to register!'

    if (error instanceof Error) {
      messsage = error.message
    }

    return { data: null, error: new Error(messsage) }
  }
}
