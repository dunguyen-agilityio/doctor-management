import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { lazy } from 'react';
import { StyleSheet, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import FavoriteScreen from '@/screens/Favorite';
import HomeScreen from '@/screens/Home';
import SearchScreen from '@/screens/Search';

import { TabIcon } from '@/components';

import { COLOR, ROUTES } from '@/constants';

export type TabParamsList = {
  [ROUTES.FAVORITE]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: { autoFocus?: boolean; query?: string; category?: string };
};

const Tab = createBottomTabNavigator<TabParamsList>();

const screenOptions = ({
  route,
}: {
  route: RouteProp<TabParamsList, keyof TabParamsList>;
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarLabel: '',
  tabBarStyle: styles.tabBarStyle,
  tabBarIconStyle: styles.tabBarIconStyle,
  tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={route.name} />,
  lazy: true,
});

const TabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
        <Tab.Screen name={ROUTES.FAVORITE} component={FavoriteScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: { height: 80, alignItems: 'center' },
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  tabBarIconStyle: { flex: 1 },
});
