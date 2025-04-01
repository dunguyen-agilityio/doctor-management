import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';

import {
  Categories,
  Container,
  FoodList,
  NotFound,
  SearchInput,
  VerticalFoodListSkeleton,
} from '@/components';

import { CATEGORIES, QUERY_KEYS, VERTICAL_PAGE_SIZE } from '@/constants';

import type { BottomTabProps } from '@/types';

import { useFocus } from '@/hooks/useFocus';
import { useFoodList } from '@/hooks/useFoodList';

import { ROUTES } from '@/routes';

import { COLOR } from '@/theme';

import { APP_ICON } from '@/icons';

const SearchScreen = ({ route: { params } }: BottomTabProps<ROUTES.SEARCH>) => {
  const searchInputRef = useRef<TextInput>(null);
  const [autoFocus, setFocus] = useFocus();

  const { categories = [], query: search = '' } = params ?? {};

  const [query, setQuery] = useState(search);
  const [filters, setFilters] = useState(categories);

  useFocusEffect(
    useCallback(() => {
      if (autoFocus) {
        setTimeout(() => searchInputRef?.current?.focus());
        return () => setFocus(false);
      }
    }, [autoFocus, setFocus]),
  );

  useEffect(() => {
    // Update filters when initialCategories provided
    if (categories.length > 0) {
      setFilters(categories);
    }

    if (search) {
      setQuery(search);
    }
  }, [categories, search]);

  useFocusEffect(
    useCallback(() => {
      // Clear SearchInput and Filters when unFocus page
      return () => {
        setFilters((prev) => (prev.length > 0 ? [] : prev));
        setQuery('');
      };
    }, [setFilters, setQuery]),
  );

  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useFoodList({
    filters,
    query,
    queryKey: QUERY_KEYS.FOOD,
    pageSize: VERTICAL_PAGE_SIZE,
  });

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderFooter = () =>
    isFetchingNextPage ? (
      <ActivityIndicator
        size="large"
        color={COLOR.GREEN}
        style={styles.footer}
      />
    ) : null;

  return (
    <Container>
      <View style={styles.header}>
        <SearchInput onSearch={setQuery} ref={searchInputRef} query={query} />
        <Categories
          onChange={setFilters}
          options={CATEGORIES}
          values={filters}
        />
      </View>
      <Container flex={1} paddingTop={25}>
        {isLoading ? (
          <VerticalFoodListSkeleton />
        ) : (
          <FoodList
            data={data}
            onEndReached={handleEndReached}
            ListEmptyComponent={
              <NotFound
                image={
                  <Image source={APP_ICON.EMPTY} style={styles.emptyImage} />
                }
                description="Try searching with a different keyword or tweak your search a little."
                title="No Results Found"
              />
            }
            ListFooterComponentStyle={styles.footer}
            ListFooterComponent={renderFooter}
          />
        )}
      </Container>
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  emptyImage: {
    width: 108,
    height: 96,
  },
  header: {
    gap: 16,
    paddingTop: 14,
  },
  listFallback: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 18,
  },
  footer: { alignSelf: 'center', paddingTop: 10, paddingBottom: 30 },
});
