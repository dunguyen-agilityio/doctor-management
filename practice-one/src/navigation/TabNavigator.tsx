import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet } from 'react-native';

import FavoriteScreen from '@/screens/Favorite';
import HomeScreen from '@/screens/Home';
import SearchScreen from '@/screens/Search';

import { APP_ICONS, Icon } from '@/components';

import { ROUTES } from '@/constants';

export type TabParamsList = {
  [ROUTES.FAVORITE]: { favorite: boolean };
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: { autoFocus?: boolean; query?: string; category?: string };
};

const Tab = createBottomTabNavigator<TabParamsList>();

const getTabIcon = (routeName: keyof TabParamsList, focused: boolean) => {
  const icons = {
    [ROUTES.FAVORITE]: (
      <Icon source={focused ? APP_ICONS.FAVORITE_FILL : APP_ICONS.FAVORITE} />
    ),
    [ROUTES.HOME]: (
      <Icon source={focused ? APP_ICONS.HOME_FILL : APP_ICONS.HOME} />
    ),
    [ROUTES.SEARCH]: (
      <Icon
        source={focused ? APP_ICONS.SEARCH_MENU_FILL : APP_ICONS.SEARCH_MENU}
      />
    ),
  };

  return icons[routeName] || null;
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
});
