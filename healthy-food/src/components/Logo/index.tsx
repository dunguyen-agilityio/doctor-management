import { StyleSheet } from 'react-native';

import { Image } from 'expo-image';

import { APP_ICON } from '@/icons';

const Logo = () => <Image source={APP_ICON.LOGO} style={styles.logo} />;

const styles = StyleSheet.create({
  logo: {
    width: 122,
    height: 122,
  },
});

export default Logo;
