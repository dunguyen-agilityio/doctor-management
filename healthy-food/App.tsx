import { useEffect, useState } from 'react';
import { DevSettings, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { hideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { RootNavigation } from '@/navigation';

import { useMeasureTTI } from '@/hooks';

import { COLOR } from '@/theme';

let StorybookUI: (() => JSX.Element) | null = null;

if (__DEV__) {
  StorybookUI = require('./.storybook').default;
}

const queryClient = new QueryClient();

const App = () => {
  const [isStorybookOpen, setIsStorybookOpen] = useState(false);

  const [loaded, error] = useFonts({
    Manrope: require('@/assets/fonts/Manrope.ttf'),
    Signika: require('@/assets/fonts/Signika.ttf'),
  });

  useMeasureTTI();

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Show Storybook', () => {
        setIsStorybookOpen(true);
      });
    }
  }, []);

  useEffect(() => {
    if (loaded || error) {
      hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (isStorybookOpen && StorybookUI) {
    return <StorybookUI />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <RootNavigation />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingTop: 30,
  },
});
