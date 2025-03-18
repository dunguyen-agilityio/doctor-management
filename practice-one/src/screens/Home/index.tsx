import { Suspense, lazy } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { type RootScreenNavigationProps } from '@/navigation';

import {
  ArticlesSlider,
  Categories,
  FoodListSkeleton,
  Header,
  SearchInput,
  Text,
} from '@/components';

import { CATEGORIES, COLOR, QUERY_KEYS, ROUTES } from '@/constants';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_ARTICLES } from '@/mocks/article';

const FoodList = lazy(() => import('@/components/FoodList'));

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useFoodList({
    queryKey: QUERY_KEYS.FOOD,
  });

  const handleEndReached = () => {
    fetchNextPage();
  };

  const handleFilter = (id: string) => {
    navigate(ROUTES.SEARCH, { category: id });
  };

  const handleSearch = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    e?.currentTarget.blur(); // Ensuring blur happens first
    navigate(ROUTES.SEARCH, { autoFocus: true });
  };

  const fallback = (
    <View style={styles.fallback}>
      <FoodListSkeleton title="All Food" />
    </View>
  );

  const renderFooter = () => {
    if (isFetchingNextPage) return null;
    return <FoodListSkeleton length={1} />;
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchInput onFocus={handleSearch} />
      <Categories onSelect={handleFilter} categories={CATEGORIES} />
      <ArticlesSlider articles={MOCK_ARTICLES} />
      {isLoading ? (
        fallback
      ) : (
        <Suspense fallback={fallback}>
          <FoodList
            data={data}
            horizontal
            onEndReached={handleEndReached}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={
              <Text variant="title3" style={styles.title}>
                All Food
              </Text>
            }
          />
        </Suspense>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  title: {
    marginTop: 22,
    marginLeft: 8,
  },
  fallback: {
    marginTop: 15,
  },
});
