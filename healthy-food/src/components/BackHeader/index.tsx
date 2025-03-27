import { Pressable, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { APP_ICONS, COLOR } from '@/constants';

const BackHeader = ({ goBack }: { goBack: () => void }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={{ position: 'absolute', bottom: -7, left: 20 }}
        onPress={goBack}
      >
        <Image
          source={APP_ICONS.ARROW_LEFT}
          style={{ width: 20, height: 14 }}
        />
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
