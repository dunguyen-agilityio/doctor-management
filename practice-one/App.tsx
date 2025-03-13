import { useEffect, useState } from 'react';
import { DevSettings, StyleSheet } from 'react-native';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RootNavigator } from '@/navigation';

import { Loading } from '@/components';

import { COLOR } from '@/constants';

import useNotify from '@/hooks/useNotify';

const queryClient = new QueryClient();

let StorybookUI: () => React.JSX.Element;

if (__DEV__) {
  StorybookUI = require('./.storybook').default;
}

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
  useNotify();

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook((prev) => !prev);
      });
    }
  }, []);

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
  },
});
