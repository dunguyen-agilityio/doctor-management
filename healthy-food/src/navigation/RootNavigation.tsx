import { linking } from '@/configs/linking';

import { lazy, useState } from 'react';

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { getLinkingURL } from 'expo-linking';

import Loading from '@/components/Loading';

import type { StackParamsList, TabParamsList } from '@/types';

import { useAppBackHandler, useAppLinking } from '@/hooks';

import RootNavigator from './StackNavigator';

export const navigationRef = createNavigationContainerRef<
  StackParamsList & TabParamsList
>();

const Notification = lazy(() => import('@/components/Notification'));

export const RootNavigation = () => {
  useAppBackHandler();
  const handleDeepLink = useAppLinking();

  const handleReady = () => {
    setIsNavigationReady(true);
    const url = getLinkingURL();
    url && handleDeepLink;
  };

  const [isNavigationReady, setIsNavigationReady] = useState(false);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Loading fullScreen />}
      ref={navigationRef}
      onReady={handleReady}
    >
      <RootNavigator />
      {isNavigationReady && <Notification />}
    </NavigationContainer>
  );
};
