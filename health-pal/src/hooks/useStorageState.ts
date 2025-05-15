import { AuthUser } from '@app/models/user'

import { useCallback, useEffect, useReducer } from 'react'

import * as SecureStore from 'expo-secure-store'

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void]

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
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

export function useStorageState(key: string): UseStateHook<AuthUser> {
  // Public
  const [state, setState] = useAsyncState<AuthUser>()

  // Get
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value ? JSON.parse(value) : null)
    })
  }, [key, setState])

  // Set
  const setValue = useCallback(
    (value: AuthUser | null) => {
      setState(value)
      setStorageItemAsync(key, JSON.stringify(value))
    },
    [key, setState],
  )

  return [state, setValue]
}
