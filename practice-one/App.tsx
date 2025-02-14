import { useCallback, useEffect, useState } from 'react';
import { Alert, DevSettings, StyleSheet, View } from 'react-native';

import App from '@App';
import { registerDevMenuItems } from 'expo-dev-menu';
import * as Font from 'expo-font';
import { hide, preventAutoHideAsync, setOptions } from 'expo-splash-screen';

import { COLORS } from '@constants';

import { default as StorybookUI } from './.storybook';

preventAutoHideAsync();

setOptions({
  duration: 1000,
  fade: true,
});

const AppRoot = () => {
  const [fontLoaded] = Font.useFonts({
    Manrope: require('./assets/fonts/Manrope.ttf'),
    Signika: require('./assets/fonts/Signika.ttf'),
  });

  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      //   Alert.alert('Dev Options', 'Toggle Storybook', [
      //     {
      //       text: 'Enable',
      //       isPreferred: true,
      //       onPress: () => {
      //         setShowStorybook((prev) => !prev);
      //       },
      //     },
      //     { text: 'Close' },
      //   ]);
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook((prev) => !prev);
      });
      //   const devMenuItems = [
      //     {
      //       name: 'My Custom Button',
      //       callback: () => console.log('Hello world!'),
      //     },
      //   ];

      //   registerDevMenuItems(devMenuItems);
    }
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (fontLoaded) {
      hide();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      {showStorybook ? <StorybookUI /> : <App />}
    </View>
  );
};

export default AppRoot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
