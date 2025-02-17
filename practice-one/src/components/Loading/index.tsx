import { memo } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { Logo } from '@/constants';

const Loading = ({ marginTop }: { marginTop?: number }) => {
  const rotation = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }),
  ).start();

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { marginTop }]} testID="loading-indicator">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Logo />
      </Animated.View>
    </View>
  );
};

export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    height: '100%',
  },
});
