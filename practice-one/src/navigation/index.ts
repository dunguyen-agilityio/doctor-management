import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RootNavigator, { type RootStackParamsList } from './RootNavigator';
import { TabParamsList } from './TabNavigator';

export type RootScreenNavigationProps<T extends keyof RootStackParamsList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamsList>,
    NativeStackNavigationProp<RootStackParamsList, T>
  >;

export { RootNavigator, TabParamsList, RootStackParamsList };
