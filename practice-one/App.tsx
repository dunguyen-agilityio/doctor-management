import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { hideAsync } from 'expo-splash-screen';

import TabNavigator from '@navigation/TabNavigator';

import { DetailsScreen, SplashScreen } from '@screens';

import { ROUTES } from '@constants';

const queryClient = new QueryClient();

const RootStack = createNativeStackNavigator({
  screens: {
    [ROUTES.SPLASH]: SplashScreen,
    [ROUTES.ROOT]: TabNavigator,
    [ROUTES.DETAIL]: DetailsScreen,
  },
  screenOptions: { headerShown: false },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  const [fontsLoaded] = useFonts({
    Manrope: require('@assets/fonts/Manrope.ttf'),
    Signika: require('@assets/fonts/Signika.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView
        style={styles.container}
        onLayout={onLayoutRootView}
      >
        <Navigation />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
// export { default } from './storybook';
