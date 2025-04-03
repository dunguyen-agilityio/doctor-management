import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ArticlesSlider,
  Categories,
  Container,
  FoodCardSkeleton,
  FoodList,
  HorizontalFoodListSkeleton,
  SearchInput,
  Text,
} from '@/components';

import { CATEGORIES, HORIZONTAL_PAGE_SIZE, QUERY_KEYS } from '@/constants';

import type { BottomTabProps } from '@/types';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_ARTICLES } from '@/mocks/article';

import { FocusDispatchContext } from '@/contexts/focus';

import { ROUTES } from '@/routes';

const HomeScreen = ({ navigation }: BottomTabProps<ROUTES.HOME>) => {
  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useFoodList({
    queryKey: QUERY_KEYS.FOOD,
    pageSize: HORIZONTAL_PAGE_SIZE,
  });

  const focusDispatch = useContext(FocusDispatchContext);

  const handleEndReached = () => {
    fetchNextPage();
  };

  const renderFooter = () => (isFetchingNextPage ? null : <FoodCardSkeleton />);

  const handleFocus = () => {
    focusDispatch(true);
    navigation.navigate(ROUTES.SEARCH);
  };

  const handleFilter = (categories: string[]) => {
    navigation.navigate(ROUTES.SEARCH, { categories });
  };

  return (
    <Container>
      <View style={styles.header}>
        <SearchInput onFocus={handleFocus} />
        <Categories onChange={handleFilter} options={CATEGORIES} />
      </View>
      <Container>
        <ArticlesSlider articles={MOCK_ARTICLES} />
        <Container gap={15}>
          <Text variant="title3" style={styles.title}>
            All Food
          </Text>
          {isLoading ? (
            <View testID="food-list-skeleton">
              <HorizontalFoodListSkeleton />
            </View>
          ) : (
            <FoodList
              data={data}
              horizontal
              onEndReached={handleEndReached}
              ListFooterComponent={renderFooter}
              initialNumToRender={HORIZONTAL_PAGE_SIZE * 2}
              maxToRenderPerBatch={HORIZONTAL_PAGE_SIZE}
            />
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    marginTop: 22,
    marginLeft: 28,
  },
  header: {
    gap: 16,
    paddingTop: 14,
  },
  fallback: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 20,
  },
});
