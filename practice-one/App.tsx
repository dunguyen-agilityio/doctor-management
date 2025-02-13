import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { hide, preventAutoHideAsync, setOptions } from 'expo-splash-screen';

import { RootNavigator } from '@navigation';

import { COLORS, Logo, SplashImage } from '@constants';

preventAutoHideAsync();

setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontLoaded] = Font.useFonts({
    Manrope: require('@assets/fonts/Manrope.ttf'),
    Signika: require('@assets/fonts/Signika.ttf'),
  });

  useEffect(() => {
    appIsReady;
    async function prepare() {
      try {
        await new Promise((res) => setTimeout(res, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (fontLoaded) {
      hide();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  if (!appIsReady) {
    return (
      <View style={styles.splash} onLayout={onLayoutRootView}>
        <SplashImage />
        <Logo />
        <Text style={styles.title}>Laomica</Text>
        <Text style={styles.description}>
          {`Stay Healthy and beautiful\nwith us!`}
        </Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontWeight: '800',
    fontSize: 32,
    color: COLORS.PRIMARY,
    marginTop: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  description: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default App;
// export { default } from './.storybook';
