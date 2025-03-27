import { Suspense, lazy } from 'react';

import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackHeader, Loading } from '@/components';
import DetailSkeleton from '@/components/Skeleton/DetailScreen';

import { ROUTES } from '@/constants';

import TabNavigator, { type TabParamsList } from './TabNavigator';

const DetailsScreen = lazy(() => import('@/screens/Details'));

export type RootStackParamsList = {
  [ROUTES.ROOT]: undefined;
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
            <Suspense fallback={<DetailSkeleton />}>{children}</Suspense>
          )}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
