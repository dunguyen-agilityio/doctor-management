import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RootNavigator } from '@/navigation';

import { Logo, Text } from '@/components';

import { APP_ICONS, BLUR_HASH, COLOR, WINDOW_WIDTH } from '@/constants';

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
        <StatusBar hidden />
        <View style={{ position: 'relative' }}>
          <Image
            source={APP_ICONS.SPLASH}
            contentFit="fill"
            style={styles.splashIcon}
            placeholder={{ blurhash: BLUR_HASH }}
            transition={1000}
          />
          <LinearGradient
            colors={['#FFFFFF', 'rgba(255, 255, 255, 0)']}
            locations={[0, 1]}
            start={{ x: 0, y: 1 }} // Top
            end={{ x: 0, y: 0 }} // Bottom
            style={{ position: 'absolute', inset: 0 }}
          />
        </View>
        <Logo />
        <Text style={styles.title} variant="main1" color={COLOR.PRIMARY}>
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
  splashIcon: { width: WINDOW_WIDTH, height: 400 },
});

export default App;
