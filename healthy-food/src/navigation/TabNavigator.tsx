import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Suspense, lazy } from 'react';
import { StyleSheet } from 'react-native';

import { type RouteProp } from '@react-navigation/native';

import {
  FavoriteScreenSkeleton,
  Header,
  HomeScreenSkeleton,
  SearchScreenSkeleton,
  TabIcon,
} from '@/components';

import type { TabParamsList } from '@/types';

import { FocusProvider } from '@/contexts/focus';

import { ROUTES } from '@/route';

const HomeScreen = lazy(() => import('@/screens/Home'));
const SearchScreen = lazy(() => import('@/screens/Search'));
const FavoriteScreen = lazy(() => import('@/screens/Favorite'));

const Tab = createBottomTabNavigator<TabParamsList>();

const screenOptions = ({
  route,
}: {
  route: RouteProp<TabParamsList, keyof TabParamsList>;
}): BottomTabNavigationOptions => ({
  headerShown: true,
  tabBarLabel: '',
  tabBarStyle: styles.tabBarStyle,
  tabBarIconStyle: styles.tabBarIconStyle,
  tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={route.name} />,
  lazy: true,
});

const TabNavigator = () => {
  return (
    <FocusProvider>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Group screenOptions={{ header: () => <Header /> }}>
          <Tab.Screen
            name={ROUTES.HOME}
            component={HomeScreen}
            layout={({ children }) => (
              <Suspense fallback={<HomeScreenSkeleton />}>{children}</Suspense>
            )}
          />
          <Tab.Screen
            name={ROUTES.SEARCH}
            component={SearchScreen}
            layout={({ children }) => (
              <Suspense fallback={<SearchScreenSkeleton />}>
                {children}
              </Suspense>
            )}
          />
        </Tab.Group>
        <Tab.Screen
          name={ROUTES.FAVORITE}
          component={FavoriteScreen}
          options={{
            headerShown: false,
          }}
          layout={({ children }) => (
            <Suspense fallback={<FavoriteScreenSkeleton />}>
              {children}
            </Suspense>
          )}
        />
      </Tab.Navigator>
    </FocusProvider>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    alignItems: 'center',
  },
  tabBarIconStyle: { flex: 1 },
});
