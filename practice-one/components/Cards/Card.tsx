import React, { memo } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Button, Text } from '../common';
import { ArrowICon, COLORS } from '@constants';
import { IArtcile } from '@types';
export interface CardProps {
  title: string;
  image: string;
  type?: CARD_TYPES;
}

type CARD_TYPES = 'green' | 'secondary';

const Card = (props: IArtcile) => {
  const { image, color = 'green', title, backgroundColor } = props;

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
        <Text fontSize="ms-0" fontWeight="600" color={color}>
          Article
        </Text>

        <Text fontSize="xl-7" fontWeight="600" customStyle={{ marginTop: 4 }}>
          {title}
        </Text>

        <Button
          paddingHorizontal={19}
          paddingVertical={6}
          borderRadius={8}
          marginTop={8}
          type={color}
        >
          <Text fontSize="ms" fontWeight="600" color="white">
            Read now
          </Text>
          <ArrowICon />
        </Button>
      </View>
    </LinearGradient>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  container: {
    height: 169,
    width: 320,
    justifyContent: 'space-between',
    borderRadius: 32,
    resizeMode: 'contain',
    position: 'relative',
    paddingRight: 0,
    overflow: 'hidden',
  },
  info: {
    maxWidth: '60%',
    color: COLORS.LIGHT_BLACK,
    padding: 32,
  },
});
