import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import {
  type LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { addEventListener, createURL, getInitialURL } from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootNavigator } from '@/navigation';
import { navigationRef } from '@/navigation/RootNavigator';

import Loading from '@/components/Loading';

import { COLOR, ROUTES } from '@/constants';

import useNotify from '@/hooks/useNotify';

const queryClient = new QueryClient();

const prefix = createURL('/');
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: 'home',
    },
  },
};

let appStartTime = Date.now();

const App = () => {
  useNotify();

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (navigationRef.isReady()) {
        if (url) {
          const route = url.replace(/.*?:\/\//g, ''); // Strip scheme (e.g., myapp://profile/123 -> profile/123)
          const [screen, param] = route.split('/');

          switch (screen) {
            case ROUTES.DETAIL:
              navigationRef.navigate(ROUTES.DETAIL, { id: param });
              break;

            case ROUTES.FAVORITE:
              navigationRef.navigate(ROUTES.FAVORITE);
              break;

            default:
              break;
          }
        }
      }
    };

    // Listen for deep links when app is opened
    const subscribe = addEventListener('url', handleDeepLink);

    // Handle initial URL (e.g., app opened via deep link)
    getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscribe.remove();
    };
  }, []);

  useEffect(() => {
    const interactiveTime = Date.now();
    const tti = interactiveTime - appStartTime;
    console.log('Time to Interactive (TTI):', tti, 'ms');
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <NavigationContainer
          linking={linking}
          fallback={<Loading fullScreen />}
          ref={navigationRef}
        >
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
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
  },
});
