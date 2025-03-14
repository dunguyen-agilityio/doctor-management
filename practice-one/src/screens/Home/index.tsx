import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@/navigation';

import {
  ArticlesSlider,
  Categories,
  FoodList,
  FoodListSkeleton,
  Header,
  SearchInput,
  Text,
} from '@/components';

import { CATEGORIES, COLOR, QUERY_KEYS, ROUTES } from '@/constants';

import { useFoodList } from '@/hooks/useFoodList';

import { MOCK_ARTICLES } from '@/mocks/article';

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useFoodList({
    queryKey: QUERY_KEYS.HOME_FOOD,
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

  return (
    <View style={styles.container}>
      <Header />
      <SearchInput onFocus={handleSearch} />
      <Categories onSelect={handleFilter} categories={CATEGORIES} />
      <ArticlesSlider articles={MOCK_ARTICLES} />
      {isLoading ? (
        <View style={styles.fallback}>
          <FoodListSkeleton title="All Food" />
        </View>
      ) : (
        <FoodList
          data={data}
          horizontal
          onEndReached={handleEndReached}
          ListFooterComponent={
            isFetchingNextPage ? <FoodListSkeleton length={1} /> : null
          }
          ListHeaderComponent={
            <Text variant="title3" style={styles.title}>
              All Food
            </Text>
          }
        />
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
