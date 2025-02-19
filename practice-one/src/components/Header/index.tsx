import { Pressable, StyleSheet, Text, View } from 'react-native';

import { QuestionIcon } from '../icons';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`Want to eat\nhealthy Food?`}</Text>
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
    lineHeight: 32,
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
