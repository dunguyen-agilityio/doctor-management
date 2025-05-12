import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import type { IFood } from '@/types';

import { COLOR } from '@/theme';

import { APP_ICON } from '@/icons';

export enum FoodImageSize {
  'medium',
  'large',
}

const TYPE_STYLES = {
  [FoodImageSize.medium]: {
    layer1: 92,
    layer2: 68,
    image: {
      width: 100,
      height: 80,
    },
  },
  [FoodImageSize.large]: {
    layer1: 157,
    layer2: 116,
    image: {
      width: 140,
      height: 110,
    },
  },
};

const COLOR_MAPPING: Record<string, string> = {
  GREEN: COLOR.GREEN,
  ORANGE: COLOR.ORANGE,
  PURPLE: COLOR.PURPLE,
  YELLOW: COLOR.YELLOW,
  RED: COLOR.RED,
};

const FoodImage = ({
  imgUrl,
  color,
  type = FoodImageSize.medium,
}: Pick<IFood, 'imgUrl' | 'color'> & { type?: FoodImageSize }) => {
  const { layer2, image, layer1 } = TYPE_STYLES[type];
  const backgroundColor = COLOR_MAPPING[color] ?? COLOR.PRIMARY;

  return (
    <View style={[styles.container, { width: layer1, height: layer1 }]}>
      <View style={[styles.layer1, { backgroundColor }]} testID="layer1" />
      <View
        style={[
          styles.layer2,
          {
            backgroundColor,
            width: layer2,
            height: layer2,
          },
        ]}
        testID="layer2"
      />
      <View
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          source={imgUrl || APP_ICON.LOGO}
          style={[styles.image, image]}
          testID="image"
          transition={1000}
          contentFit="contain"
        />
      </View>
    </View>
  );
};

export default FoodImage;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  layer1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    opacity: 0.2,
    flex: 1,
  },
  layer2: {
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateY: `-${50}%` }, { translateX: `-${50}%` }],
    borderRadius: '100%',
  },
  image: {
    zIndex: 2,
  },
});
