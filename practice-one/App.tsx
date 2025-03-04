import { useEffect, useState } from 'react';
import { DevSettings, StyleSheet, View } from 'react-native';

import * as Font from 'expo-font';
import {
  hideAsync,
  preventAutoHideAsync,
  setOptions,
} from 'expo-splash-screen';

import { COLOR } from '@/constants';

import { default as StorybookUI } from './.storybook';
import App from './src/App';

preventAutoHideAsync();

setOptions({
  duration: 1000,
  fade: true,
});

const AppRoot = () => {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook((prev) => !prev);
      });
    }
  }, []);

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await Font.loadAsync({
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

  if (!appIsReady) return null;

  return (
    <View style={styles.container}>
      {showStorybook ? <StorybookUI /> : <App />}
    </View>
  );
};

export default AppRoot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});
