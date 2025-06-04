import { deleteItemAsync, setItemAsync } from 'expo-secure-store'

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await deleteItemAsync(key)
  } else {
    await setItemAsync(key, value)
  }
}
