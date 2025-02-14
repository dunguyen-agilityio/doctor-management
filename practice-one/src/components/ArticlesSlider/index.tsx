import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Article from '@components/Article';

import { IArticle } from '@types';

const Slider = ({ articles }: { articles: IArticle[] }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.list}>
          {articles.map((item) => (
            <Article key={item.id} {...item} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.navigation}>
        <Pressable style={[styles.item, styles.activeItem]} />
        <Pressable style={[styles.item]} />
        <Pressable style={[styles.item]} />
      </View>
    </View>
  );
};

export default memo(Slider);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    height: 220,
  },
  list: { flexDirection: 'row', gap: 16, paddingHorizontal: 16 },
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
