import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';

import { StyleSheet, View } from 'react-native';

import FavoriteScreen from '@/screens/Favorite';
import HomeScreen from '@/screens/Home';
import SearchScreen from '@/screens/Search';

import { APP_ICONS, ROUTES } from '@/constants';

export type TabParamsList = {
  [ROUTES.FAVORITE]: { favorite: boolean };
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: { autoFocus?: boolean; query?: string; category?: string };
};

const Tab = createBottomTabNavigator<TabParamsList>();

const getTabIcon = (routeName: keyof TabParamsList, focused: boolean) => {
  const iconByRoute = {
    [ROUTES.FAVORITE]: focused ? APP_ICONS.FAVORITE_FILL : APP_ICONS.FAVORITE,
    [ROUTES.HOME]: focused ? APP_ICONS.HOME_FILL : APP_ICONS.HOME,
    [ROUTES.SEARCH]: focused
      ? APP_ICONS.SEARCH_MENU_FILL
      : APP_ICONS.SEARCH_MENU,
  };

  const icon = iconByRoute[routeName];

  if (!icon) return null;

  return <Image source={icon} style={styles.icon} contentFit="contain" />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.SEARCH} component={SearchScreen} />
      <Tab.Screen
        name={ROUTES.FAVORITE}
        component={FavoriteScreen}
        initialParams={{ favorite: true }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: { height: 80 },
  icon: {
    width: 32,
    height: 32,
  },
});
