import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import type { CompositeNavigationProp } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { ROUTES } from '@/routes';

export type SearchPageParams = {
  query?: string;
  categories?: string[];
};

type FavoritePageParams = {
  query?: string;
};

export type TabParamsList = {
  [ROUTES.FAVORITE]?: FavoritePageParams;
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]?: SearchPageParams;
};

export type StackParamsList = {
  [ROUTES.ROOT]: undefined;
  [ROUTES.DETAIL]: {
    id: string;
  };
};

export type BottomTabProps<T extends keyof TabParamsList> =
  BottomTabScreenProps<TabParamsList, T>;

export type StackScreenProps<T extends keyof StackParamsList> =
  NativeStackScreenProps<StackParamsList, T>;

export type ScreenNavigationProps<T extends keyof StackParamsList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamsList>,
    NativeStackNavigationProp<StackParamsList, T>
  >;
