import { Session, User } from '@/models/user'

import dayjs from 'dayjs'
import { getItemAsync } from 'expo-secure-store'

import { APIResponse, AuthCredentials, UserProfileData } from '@/types'

import { apiClient } from './http-client'

export const login = async ({
  email,
  password,
}: AuthCredentials): Promise<APIResponse<Session>> => {
  try {
    const { jwt } = await apiClient.post<Session>('auth/local', {
      body: { identifier: email, password },
    })

    const profile = await getProfile(jwt)

    if (!profile) {
      throw new Error('Failed to get Profile')
    }

    return { data: { jwt, user: profile }, error: null }
  } catch (error) {
    let message = 'Failed to login!'

    if (error instanceof Error) {
      message = error.message
    }

    return { data: null, error: new Error(message) }
  }
}

export const getProfile = async (jwt: string) => {
  try {
    const response = await apiClient.get<User>('users/me?populate[avatar][fields][1]=url', {
      jwt,
    })

    return response
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('error', error)
    }
    return null
  }
}

export const register = async ({
  dateOfBirth,
  gender,
  nickname,
  ...data
}: UserProfileData): Promise<APIResponse<Session>> => {
  try {
    const response = await apiClient.post<Session>('auth/local/register', {
      body: {
        ...data,
        dateOfBirth: dayjs(dateOfBirth).format('YYYY-MM-DD'),
        gender: gender === 'Male',
        username: nickname,
      },
    })

    return { data: response, error: null }
  } catch (error) {
    let message = 'Failed to register!'

    if (error instanceof Error) {
      message = error.message
    }

    return { data: null, error: { message } }
  }
}

export const updateProfile = async (
  formData: Partial<UserProfileData>,
): Promise<APIResponse<User>> => {
  const jwt = await getJwt()

  try {
    const { dateOfBirth, gender, id, avatarUrl: _, ...data } = formData

    const payload = {
      ...data,
      ...(dateOfBirth && { dateOfBirth: dayjs(dateOfBirth).format('YYYY-MM-DD') }),
      ...(gender !== undefined && { gender: gender === 'Male' }),
      username: data.nickname,
    }

    await apiClient.put<User>(`users/${id}`, {
      body: payload,
      jwt,
    })

    const profile = await getProfile(jwt)

    if (!profile) {
      throw new Error('Failed to get Profile')
    }

    return { data: profile, error: null }
  } catch (error) {
    let message = 'Failed to update profile!'

    if (error instanceof Error) {
      message = error.message
    }

    return { data: null, error: new Error(message) }
  }
}

export const getJwt = async (): Promise<string> => {
  const jwt = await getItemAsync('session')

  if (!jwt) {
    throw new Error('JWT not found in secure storage')
  }

  return jwt
}
