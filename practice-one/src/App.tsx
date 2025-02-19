import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RootNavigator } from '@/navigation';

import { COLOR } from '@/constants';

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
        <Text style={styles.title}>Laomica</Text>
        <Text style={styles.description}>
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
    fontWeight: '800',
    fontSize: 32,
    color: COLOR.PRIMARY,
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
