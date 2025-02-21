import { LinearGradient } from 'expo-linear-gradient';

import { memo } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLOR } from '@/constants';

import { IArticle } from '@/types';

import Text, { TextColor } from '../Text';
import { ArrowICon } from '../icons';

const buttonColor = {
  green: COLOR.GREEN,
  secondary: COLOR.SECONDARY,
};

const Article = ({ image, color, title, backgroundColor }: IArticle) => {
  return (
    <LinearGradient
      colors={backgroundColor}
      locations={[0, 0.5]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={{ uri: image }}
        resizeMode="contain"
        style={{
          height: '80%',
          width: '100%',
          minWidth: 160,
          position: 'absolute',
          right: '-32%',
          bottom: 0,
        }}
      />
      <View style={styles.info}>
        <Text variant="subtitle5" color={buttonColor[color]}>
          Article
        </Text>
        <Text
          variant="subtitle4"
          style={styles.title}
          color={TextColor.TERTIARY}
        >
          {title}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor[color] }]}
        >
          <Text variant="subtitle6" color={COLOR.WHITE}>
            Read now
          </Text>
          <ArrowICon />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default memo(Article);

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: (20 / 100) * window.height,
    width: (85 / 100) * window.width,
    minWidth: 320,
    minHeight: 170,
    justifyContent: 'space-between',
    borderRadius: 32,
    resizeMode: 'contain',
    position: 'relative',
    paddingRight: 0,
    overflow: 'hidden',
  },
  title: {
    marginTop: 4,
  },
  info: {
    maxWidth: '60%',
    color: COLOR.LIGHT_BLACK,
    padding: 32,
    alignItems: 'flex-start',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: 104,
  },
});
