import React from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '@/constants';

const FoodCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageSkeleton} />
      <View style={styles.textSkeleton} />
      <View style={styles.textSkeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 27,
    paddingVertical: 17,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    height: 192,
    minWidth: 154,
  },
  imageSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  textSkeleton: {
    width: '80%',
    height: 14,
    marginTop: 10,
    backgroundColor: '#E0E0E0',
  },
});

export default FoodCardSkeleton;
