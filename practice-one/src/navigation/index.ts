import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RootNavigator, { RootStackParamsList } from './RootNavigator';
import { TabParamsList } from './TabNavigator';

export type RootScreenNavigationProps<T extends keyof RootStackParamsList> =
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamsList>,
    NativeStackNavigationProp<RootStackParamsList, T>
  >;

export { RootNavigator, TabParamsList, RootStackParamsList };
