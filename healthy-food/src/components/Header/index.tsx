import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { COLOR } from '@/theme';

import { APP_ICON } from '@/icons';

import Button from '../Button';
import Text from '../Text';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text variant="main2">{`Want to eat\nhealthy Food?`}</Text>
      <Button
        testID="question-icon"
        variant="icon"
        width={35}
        backgroundColor="#00000021"
      >
        <Image source={APP_ICON.QUESTION} style={styles.icon} />
      </Button>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    paddingTop: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
  },
  icon: {
    width: 9,
    height: 14,
  },
});
