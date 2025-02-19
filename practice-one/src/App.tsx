import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RootNavigator } from '@/navigation';

import { COLOR } from '@/constants';

import Text from './components/Text';
import { Logo, SplashImage } from './components/icons';

const queryClient = new QueryClient();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((res) => setTimeout(res, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.splash}>
        <SplashImage />
        <Logo />
        <Text style={styles.title} variant="main" color={COLOR.PRIMARY}>
          Laomica
        </Text>
        <Text variant="body3" style={styles.description}>
          {`Stay Healthy and beautiful\nwith us!`}
        </Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
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
    backgroundColor: COLOR.WHITE,
  },
  title: {
    color: COLOR.PRIMARY,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    marginTop: 12,
    textAlign: 'center',
  },
});

export default App;
