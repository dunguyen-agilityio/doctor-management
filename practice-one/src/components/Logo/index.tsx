import { StyleSheet } from 'react-native';

import { APP_ICONS, Icon } from '../Icon';

const Logo = () => <Icon source={APP_ICONS.LOGO} style={styles.logo} />;

const styles = StyleSheet.create({
  logo: {
    width: 122,
    height: 122,
  },
});

export default Logo;
