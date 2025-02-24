import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FavoriteScreen from '@/screens/Favorite';
import HomeScreen from '@/screens/Home';
import SearchScreen from '@/screens/Search';

import { FavoriteMenu, HomeMenu, SearchMenu } from '@/components/icons';

import { ROUTES } from '@/constants';

export type TabParamsList = {
  [ROUTES.FAVORITE]: { favorite: boolean };
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: { autoFocus?: boolean; query?: string; category?: string };
};

const Tab = createBottomTabNavigator<TabParamsList>();

const getTabIcon = (routeName: keyof TabParamsList, focused: boolean) => {
  const icons = {
    [ROUTES.FAVORITE]: <FavoriteMenu isFill={focused} />,
    [ROUTES.HOME]: <HomeMenu isFill={focused} />,
    [ROUTES.SEARCH]: <SearchMenu isFill={focused} />,
  };

  return icons[routeName] || null;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: { height: 80 },
        tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
        unmountOnBlur: true,
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
