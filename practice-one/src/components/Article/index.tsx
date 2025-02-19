import { LinearGradient } from 'expo-linear-gradient';

import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLOR } from '@/constants';

import { IArticle } from '@/types';

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

export default memo(Article);

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
    color: COLOR.LIGHT_BLACK,
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
    color: COLOR.LIGHT_BLACK,
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
