import { type LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';

const prefix = createURL('/');

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
};
