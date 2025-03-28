import { Suspense, lazy, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  type LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { loadAsync } from 'expo-font';
import {
  getLinkingURL,
  addEventListener as linkingAddEventListener,
  createURL as linkingCreateURL,
  parse as linkingParse,
} from 'expo-linking';
import {
  hideAsync,
  preventAutoHideAsync,
  setOptions,
} from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import RootNavigator, { navigationRef } from '@/navigation/RootNavigator';

import Loading from '@/components/Loading';

import { COLOR, ROUTES } from '@/constants';

const Notification = lazy(() => import('@/components/Notification'));

const queryClient = new QueryClient();

const prefix = linkingCreateURL('/');

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
};

const appStartTime = Date.now();

preventAutoHideAsync();
setOptions({
  duration: 1000,
  fade: true,
});

const handleDeepLink = (url: string) => {
  const { hostname, path, queryParams } = linkingParse(url);
  const params = queryParams ?? {};

  switch (hostname) {
    case ROUTES.DETAIL:
      if (path) {
        navigationRef.navigate(ROUTES.DETAIL, { id: path });
      } else {
        console.log('Error: unknown hostname ' + hostname);
      }
      break;

    case ROUTES.FAVORITE:
      navigationRef.navigate(ROUTES.FAVORITE);
      break;

    case ROUTES.SEARCH:
      if (
        params !== null &&
        'categories' in params &&
        params['categories'] &&
        typeof params['categories'] === 'string'
      ) {
        params['categories'] = params['categories'].split(',');
      }

      navigationRef.navigate(ROUTES.SEARCH, params);
      break;

    default:
      break;
  }
};

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const handleLinkingListener = ({ url }: { url: string }) => {
      if (navigationRef.isReady()) handleDeepLink(url);
    };

    // Listen for deep links when app is opened
    const subscribe = linkingAddEventListener('url', handleLinkingListener);

    return () => {
      subscribe.remove();
    };
  }, []);

  useEffect(() => {
    const interactiveTime = Date.now();
    const tti = interactiveTime - appStartTime;
    console.log('Time to Interactive (TTI):', tti, 'ms');
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await loadAsync({
          Manrope: require('@assets/fonts/Manrope.ttf'),
          Signika: require('@assets/fonts/Signika.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        hideAsync();
        if (navigationRef.isReady()) {
          navigationRef.navigate(ROUTES.ROOT);
        }
      }
    }
    prepare();
  }, []);

  const handleNavigationReady = () => {
    setIsAppReady(true);

    const url = getLinkingURL();

    if (url) {
      handleDeepLink(url);
    }
  };

  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <NavigationContainer
          linking={linking}
          fallback={<Loading fullScreen />}
          ref={navigationRef}
          onReady={handleNavigationReady}
        >
          <RootNavigator />
        </NavigationContainer>
        {isAppReady && (
          <Suspense>
            <Notification />
          </Suspense>
        )}
      </QueryClientProvider>
    </View>
  );
};

let AppEntryPoint = App;

if (__DEV__ && Constants.expoConfig?.extra?.storybook) {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingTop: 30,
  },
});
