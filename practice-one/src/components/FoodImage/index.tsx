import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { COLOR } from '@/constants';

import { IFood } from '@/types';

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

export const DEFAULT_IMAGE = '@assets/images/logo.png';

const FoodImage = ({
  imgUrl,
  color,
  type = FoodImageSize.medium,
}: Pick<IFood, 'imgUrl' | 'color'> & { type?: FoodImageSize }) => {
  const getColor = () => {
    switch (color) {
      case 'RED':
        return COLOR.RED;
      case 'PURPLE':
        return COLOR.PURPLE;
      case 'ORANGE':
        return COLOR.ORANGE;
      case 'YELLOW':
        return COLOR.YELLOW;
      case 'GREEN':
        return COLOR.GREEN;
      case 'PRIMARY':
      default:
        return COLOR.PRIMARY;
    }
  };

  const { layer2, image, layer1 } = TYPE_STYLES[type];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.layer1,
          {
            backgroundColor: getColor(),
            opacity: 0.2,
            height: layer1,
            width: layer1,
            borderRadius: layer1 / 2,
          },
        ]}
        testID="layer1"
      />
      <View
        style={[
          styles.layer2,
          {
            backgroundColor: getColor(),
            width: layer2,
            height: layer2,
            borderRadius: layer2 / 2,
            top: (layer1 - layer2) / 2,
            left: (layer1 - layer2) / 2,
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
          source={{ uri: imgUrl || DEFAULT_IMAGE }}
          style={[styles.image, image]}
          testID="image"
        />
      </View>
    </View>
  );
};

export default memo(FoodImage);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  layer1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer2: {
    zIndex: 1,
    position: 'absolute',
  },
  image: {
    zIndex: 2,
    resizeMode: 'contain',
  },
});
