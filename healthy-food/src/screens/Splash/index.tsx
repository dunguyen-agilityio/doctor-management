import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { loadAsync } from 'expo-font';
import { Image } from 'expo-image';
import {
  hideAsync,
  preventAutoHideAsync,
  setOptions,
} from 'expo-splash-screen';

import { type RootScreenNavigationProps } from '@/navigation';

import { ROUTES } from '@/constants/screens';

preventAutoHideAsync();

setOptions({
  duration: 1000,
  fade: true,
});

const SplashScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.SPLASH>>();

  useEffect(() => {
    async function prepare() {
      try {
        await loadAsync({
          Manrope: require('@assets/fonts/Manrope.ttf'),
          Signika: require('@assets/fonts/Signika.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        hideAsync();
        navigate(ROUTES.ROOT);
      }
    }
    prepare();
  }, [navigate]);

  return (
    <Image
      source={require('@assets/images/splash.webp')}
      style={styles.container}
    />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    inset: 0,
  },
});
