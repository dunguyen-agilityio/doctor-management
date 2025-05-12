import { Suspense, lazy } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackHeader, DetailScreenSkeleton, Loading } from '@/components';

import type { StackParamsList, TabParamsList } from '@/types';

import { ROUTES } from '@/routes';

const TabNavigator = lazy(() => import('./TabNavigator'));
const DetailsScreen = lazy(() => import('@/screens/Details'));

const RootStack = createNativeStackNavigator<StackParamsList & TabParamsList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      screenLayout={({ children }) => (
        <Suspense fallback={<Loading fullScreen />}>{children}</Suspense>
      )}
      initialRouteName={ROUTES.ROOT}
    >
      <RootStack.Group>
        <RootStack.Screen name={ROUTES.ROOT} component={TabNavigator} />
        <RootStack.Screen
          name={ROUTES.DETAIL}
          component={DetailsScreen}
          options={{
            headerShown: true,
            title: '',
            headerShadowVisible: false,
            header: ({ navigation }) => (
              <BackHeader goBack={navigation.goBack} />
            ),
          }}
          layout={({ children }) => (
            <Suspense fallback={<DetailScreenSkeleton />}>{children}</Suspense>
          )}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
