import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { DevSettings, StyleSheet } from 'react-native';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadAsync } from 'expo-font';
import {
  hideAsync,
  preventAutoHideAsync,
  setOptions,
} from 'expo-splash-screen';

import { RootNavigator } from '@/navigation';

import SplashScreen from '@/screens/Splash';

import { Loading } from '@/components';

import { COLOR } from '@/constants';

import useNotify from '@/hooks/useNotify';

const queryClient = new QueryClient();

let StorybookUI: () => React.JSX.Element;

if (__DEV__) {
  StorybookUI = require('./.storybook').default;
}

preventAutoHideAsync();

setOptions({
  duration: 1000,
  fade: true,
});

const prefix = Linking.createURL('/');
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: 'home',
      About: 'about',
    },
  },
};

const AppRoot = () => {
  const [showStorybook, setShowStorybook] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  useNotify();

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook((prev) => !prev);
      });
    }

    async function prepare() {
      try {
        await loadAsync({
          Manrope: require('@assets/fonts/Manrope.ttf'),
          Signika: require('@assets/fonts/Signika.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) return <SplashScreen />;

  return (
    <GestureHandlerRootView style={styles.container}>
      {showStorybook ? (
        <StorybookUI />
      ) : (
        <QueryClientProvider client={queryClient}>
          <StatusBar />
          <NavigationContainer linking={linking} fallback={<Loading />}>
            <RootNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      )}
    </GestureHandlerRootView>
  );
};

export default AppRoot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingTop: 60,
  },
});
