import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async <T>(key: string) => {
  const storage = await AsyncStorage.getItem(key);

  if (storage) {
    return JSON.parse(storage) as T;
  }

  return null;
};
