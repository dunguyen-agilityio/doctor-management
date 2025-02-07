import React, { memo, useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Card from './Card';
import { IArticle } from '@types';
import { MOCK_ARTICLES } from '@__mock__';

const Cards = () => {
  const handleItemSeparatorComponent = useCallback(
    () => <View style={styles.item} />,
    []
  );

  const handleRenderItem = useCallback(
    ({ item }: { item: IArticle }) => <Card {...item} color={item.color} />,
    []
  );

  const handleKeyExtractor = useCallback((item: IArticle) => item.id + '', []);

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ARTICLES}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={handleItemSeparatorComponent}
        style={[styles.slide]}
      />

      <View style={styles.separator}></View>
    </View>
  );
};

export default memo(Cards);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  slide: {
    height: 'auto',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  separator: {
    height: 20,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 23,
  },
  item: {
    marginHorizontal: 16,
  },
});

export { Card };
