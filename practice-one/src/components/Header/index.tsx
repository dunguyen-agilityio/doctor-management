import { StyleSheet, View } from 'react-native';

import Button from '../Button';
import { APP_ICONS, Icon } from '../Icon';
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
        <Icon source={APP_ICONS.QUESTION} />
      </Button>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 23,
    fontWeight: '800',
  },
});
