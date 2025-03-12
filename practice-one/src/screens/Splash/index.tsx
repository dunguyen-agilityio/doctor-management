import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet, View } from 'react-native';

import { Logo, Text } from '@/components';

import { APP_ICONS, BLUR_HASH, COLOR, WINDOW_WIDTH } from '@/constants';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ position: 'relative' }}>
        <Image
          source={APP_ICONS.SPLASH}
          contentFit="fill"
          style={styles.splashIcon}
          placeholder={{ blurhash: BLUR_HASH }}
          transition={1000}
        />
        <LinearGradient
          colors={[COLOR.WHITE, 'rgba(255, 255, 255, 0)']}
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
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
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
