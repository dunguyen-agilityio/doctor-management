import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { ArrowICon, COLORS } from '@constants';

import { IArticle } from '@types';

export interface CardProps {
  title: string;
  image: string;
  type?: CARD_TYPES;
}

type CARD_TYPES = 'green' | 'secondary';

const buttonColor = {
  green: COLORS.GREEN,
  secondary: COLORS.SECONDARY,
};

const Card = (props: IArticle) => {
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
        <Text style={[styles.articleText, { color: buttonColor[color] }]}>
          Article
        </Text>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColor[color] }]}
        >
          <Text style={styles.buttonText}>Read now</Text>
          <ArrowICon />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  articleText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 4,
    fontFamily: 'Signika',
    color: COLORS.LIGHT_BLACK,
  },
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
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: 104,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
