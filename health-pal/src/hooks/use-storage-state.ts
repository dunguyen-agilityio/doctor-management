import { useEffect, useReducer } from 'react'

import * as SecureStore from 'expo-secure-store'

import { AuthUser } from '@app/models/user'

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

export const useAsyncState = <T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> => {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key)
  } else {
    await SecureStore.setItemAsync(key, value)
  }
}

export const useStorageState = (key: string): UseStateHook<AuthUser> => {
  // Public
  const [state, setState] = useAsyncState<AuthUser>()

  // Get
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value ? JSON.parse(value) : null)
    })
  }, [key, setState])

  // Set
  const setValue = (value: AuthUser | null) => {
    setState(value)
    setStorageItemAsync(key, JSON.stringify(value))
  }

  return [state, setValue]
}
