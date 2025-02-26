import { LinearGradient } from 'expo-linear-gradient';

import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ArrowRightBoldIcon } from '@/components';
import { Button, Text } from '@/components';

import { COLOR } from '@/constants';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/dimensions';

import { IArticle, TEXT_COLOR } from '@/types';

const buttonColor = {
  primary: COLOR.GREEN,
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
        <Text variant="subtitle4" color={TEXT_COLOR.TERTIARY}>
          {title}
        </Text>
        <Button
          style={styles.button}
          width={104}
          backgroundColor={buttonColor[color]}
        >
          <Text variant="subtitle6" color={COLOR.WHITE}>
            Read now
          </Text>
          <ArrowRightBoldIcon />
        </Button>
      </View>
    </LinearGradient>
  );
};

export default memo(Article);

const styles = StyleSheet.create({
  container: {
    height: (20 / 100) * WINDOW_HEIGHT,
    width: (85 / 100) * WINDOW_WIDTH,
    minWidth: 320,
    minHeight: 170,
    justifyContent: 'space-between',
    borderRadius: 32,
    resizeMode: 'contain',
    position: 'relative',
    paddingRight: 0,
    overflow: 'hidden',
  },
  info: {
    maxWidth: '60%',
    color: COLOR.LIGHT_BLACK,
    padding: 32,
    alignItems: 'flex-start',
    gap: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
});
