import { StyleSheet, View } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  CarouselRenderItem,
  Pagination,
} from 'react-native-reanimated-carousel';

import Article from '@/components/Article';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/constants/dimensions';

import type { IArticle } from '@/types';

import { COLOR } from '@/theme';

const modeConfig = {
  parallaxScrollingScale: 1,
  parallaxScrollingOffset: 50,
};

const ArticleSlider = ({ articles }: { articles: IArticle[] }) => {
  const progress = useSharedValue(0);

  const renderItem: CarouselRenderItem<IArticle> = ({ item, index }) => (
    <Article marginLeft={16} marginRight={index === 0 ? 16 : 0} {...item} />
  );

  return (
    <View style={styles.container} testID="article-slider">
      <View style={styles.carousel}>
        <Carousel
          data={articles}
          loop={false}
          pagingEnabled
          snapEnabled
          width={WINDOW_WIDTH}
          style={styles.carousel}
          mode="parallax"
          modeConfig={modeConfig}
          onProgressChange={progress}
          renderItem={renderItem}
        />
      </View>

      <View testID="pagination">
        <Pagination.Custom<{ id: string }>
          progress={progress}
          data={articles.map((id) => id)}
          size={20}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.pagination}
          horizontal
        />
      </View>
    </View>
  );
};

export default ArticleSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  carousel: {
    height: (20 / 100) * WINDOW_HEIGHT,
  },
  pagination: {
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 23,
  },
  dot: {
    height: 8,
    width: 12,
    backgroundColor: 'rgba(255, 132, 115, 0.5)',
    borderRadius: 16,
  },
  activeDot: {
    backgroundColor: COLOR.SECONDARY,
    width: 20,
    height: 10,
  },
});
