import { Suspense, lazy } from 'react';

import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '@/screens/Splash';

import Loading from '@/components/Loading';

import { APP_ICONS, ROUTES } from '@/constants';

import TabNavigator, { type TabParamsList } from './TabNavigator';

const DetailsScreen = lazy(() => import('@/screens/Details'));

export type RootStackParamsList = {
  [ROUTES.ROOT]: undefined;
  [ROUTES.SPLASH]: undefined;
  [ROUTES.DETAIL]: {
    id: string;
  };
} & TabParamsList;

const RootStack = createNativeStackNavigator<RootStackParamsList>();
export const navigationRef =
  createNavigationContainerRef<RootStackParamsList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      screenLayout={({ children }) => (
        <Suspense fallback={<Loading fullScreen />}>{children}</Suspense>
      )}
    >
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
  );
};

export default RootNavigator;
