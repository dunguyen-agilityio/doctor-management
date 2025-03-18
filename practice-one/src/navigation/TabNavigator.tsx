import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Suspense, lazy } from 'react';
import { StyleSheet, View } from 'react-native';

import type { RouteProp } from '@react-navigation/native';

import Loading from '@/components/Loading';
import TabIcon from '@/components/TabIcon';

import { COLOR, ROUTES } from '@/constants';

const HomeScreen = lazy(() => import('@/screens/Home'));
const SearchScreen = lazy(() => import('@/screens/Search'));
const FavoriteScreen = lazy(() => import('@/screens/Favorite'));

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
      <Tab.Navigator
        screenOptions={screenOptions}
        screenLayout={({ children }) => (
          <Suspense fallback={<Loading fullScreen />}>{children}</Suspense>
        )}
      >
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
