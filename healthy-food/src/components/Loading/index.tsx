import { Animated, Easing, StyleSheet, View } from 'react-native';

import Logo from '../Logo';

const Loading = ({
  marginTop,
  fullScreen,
}: {
  marginTop?: number;
  fullScreen?: boolean;
}) => {
  const rotation = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ).start();

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[
        styles.container,
        { marginTop },
        fullScreen && { height: '100%', justifyContent: 'center' },
      ]}
      testID="loading-indicator"
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Logo />
      </Animated.View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
});
