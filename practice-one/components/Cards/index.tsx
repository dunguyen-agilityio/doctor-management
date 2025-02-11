import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { MOCK_ARTICLES } from '@__mock__';
import Card from './Card';
import {
  GestureHandlerRootView,
  Pressable,
  ScrollView,
} from 'react-native-gesture-handler';

const Cards = () => {
  return (
    <GestureHandlerRootView style={{ height: 220 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        pagingEnabled
      >
        {MOCK_ARTICLES.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <Pressable style={[styles.item, styles.activeItem]} />
        <Pressable style={[styles.item]} />
        <Pressable style={[styles.item]} />
      </View>
    </GestureHandlerRootView>
  );
};

export default memo(Cards);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 16,
    marginTop: 16,
  },
  navigation: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  item: {
    height: 8,
    width: 12,
    backgroundColor: 'rgba(255, 132, 115, 0.5)',
    borderRadius: 16,
  },
  activeItem: {
    backgroundColor: '#FF8473',
    width: 20,
    height: 10,
  },
});
