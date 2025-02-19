import { Pressable, StyleSheet, View } from 'react-native';

import Text from '../Text';
import { QuestionIcon } from '../icons';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text variant="main2">{`Want to eat\nhealthy Food?`}</Text>
      <Pressable style={styles.buttonHelp} testID="question-icon" role="button">
        <QuestionIcon />
      </Pressable>
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
  buttonHelp: {
    width: 35,
    height: 35,
    borderRadius: '100%',
    backgroundColor: '#00000021',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
