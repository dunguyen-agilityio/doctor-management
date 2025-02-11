import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';

import { DetailsScreen, SplashScreen } from '@screens';
import { DETAIL, ROOT, SPLASH } from '@constants';

import { hideAsync } from 'expo-splash-screen';
import TabNavigator from '@navigation/TabNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const RootStack = createNativeStackNavigator({
  screens: {
    [SPLASH]: SplashScreen,
    [ROOT]: TabNavigator,
    [DETAIL]: DetailsScreen,
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
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Navigation />
      </View>
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
