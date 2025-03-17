import { Suspense, lazy } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import DetailsScreen from '@/screens/Details';
import SplashScreen from '@/screens/Splash';

import { Loading } from '@/components';

import { APP_ICONS, ROUTES } from '@/constants';

import TabNavigator, { TabParamsList } from './TabNavigator';

const DetailsScreen = lazy(() => import('@/screens/Details'));

export type RootStackParamsList = {
  [ROUTES.ROOT]: undefined;
  [ROUTES.SPLASH]: undefined;
  [ROUTES.DETAIL]: {
    id: string;
  };
} & TabParamsList;

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamsList>();

  return (
    <Suspense fallback={<Loading />}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Group>
          <RootStack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
          <RootStack.Screen name={ROUTES.ROOT} component={TabNavigator} />
          <RootStack.Screen
            name={ROUTES.DETAIL}
            component={DetailsScreen}
            options={{
              headerShown: true,
              title: '',
              headerShadowVisible: false,
              headerBackImageSource: APP_ICONS.ARROW_LEFT,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </Suspense>
  );
};

export default RootNavigator;
