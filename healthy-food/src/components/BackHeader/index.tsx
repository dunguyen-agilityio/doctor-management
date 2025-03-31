import { Pressable, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { COLOR } from '@/theme';

import { APP_ICON } from '@/icons';

const BackHeader = ({ goBack }: { goBack: () => void }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ position: 'absolute', bottom: -7, left: 20 }}
        onPress={goBack}
      >
        <Image source={APP_ICON.ARROW_LEFT} style={{ width: 20, height: 14 }} />
      </Pressable>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    height: 35,
    position: 'relative',
    backgroundColor: COLOR.WHITE,
  },
});
