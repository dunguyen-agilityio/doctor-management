import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@navigation';

import { COLORS, LoadingImage, ROUTES, SplashImage } from '@constants';

const SplashScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.SPLASH>>();
  const animation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false, // not supported in expo
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      navigate(ROUTES.ROOT);
    });
  }, [navigate, animation]);

  return (
    <Animated.View style={[styles.container, { opacity: animation }]}>
      <View style={styles.background}>
        <SplashImage />
        <LoadingImage />
        <Text style={styles.title}>Laomica</Text>
        <Text style={styles.description}>
          {`Stay Healthy and beautiful\nwith us!`}
        </Text>
      </View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 32,
    color: COLORS.PRIMARY,
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
