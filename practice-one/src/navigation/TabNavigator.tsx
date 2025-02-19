import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FavoriteScreen from '@/screens/Favorite';
import HomeScreen from '@/screens/Home';
import SearchScreen from '@/screens/Search';

import { FavoriteMenu, HomeMenu, SearchMenu } from '@/components/icons';

import { ROUTES } from '@/constants';

export type TabParamsList = {
  [ROUTES.FAVORITE]?: { favorite: boolean };
  [ROUTES.HOME]: undefined;
  [ROUTES.SEARCH]: undefined;
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabParamsList>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: { height: 80 },
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case ROUTES.FAVORITE:
              return <FavoriteMenu isFill={focused} />;
            case ROUTES.HOME:
              return <HomeMenu isFill={focused} />;
            case ROUTES.SEARCH:
              return <SearchMenu isFill={focused} />;
          }
        },
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
