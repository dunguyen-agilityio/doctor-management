import { useCallback, useRef } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootScreenNavigationProps, TabParamsList } from '@/navigation';

import { Categories, FoodList, Loading, SearchInput } from '@/components';
import { FoodListProps } from '@/components/FoodList';

import { CATEGORIES, COLOR, QUERY_KEYS, ROUTES } from '@/constants';

import { useFilters } from '@/hooks/useFilters';
import { useFoodList } from '@/hooks/useFoodList';
import { useSearchQuery } from '@/hooks/useSearchQuery';

type SearchNavigation = RootScreenNavigationProps<typeof ROUTES.SEARCH>;

const SearchFood = (props: FoodListProps) => {
  const { setParams } = useNavigation<SearchNavigation>();
  const { query, setQuery } = useSearchQuery();
  const searchInputRef = useRef<TextInput>(null);
  const route = useRoute<RouteProp<TabParamsList, typeof ROUTES.SEARCH>>();

  const { filters, setFilters } = useFilters();

  const { autoFocus, category } = route.params ?? {};
  useFocusEffect(
    useCallback(() => {
      setFilters((prev) => (category ? [category] : prev.length ? [] : prev));

      return () => {
        if (category) setParams({ category: undefined });
      };
    }, [category, setFilters, setParams]),
  );

  useFocusEffect(
    useCallback(() => {
      if (autoFocus) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        });
      }

      return () => {
        searchInputRef.current?.clear();

        if (autoFocus) {
          setParams({
            autoFocus: false,
          });
        }
      };
    }, [autoFocus, setParams]),
  );

  const toggleFilter = useCallback(
    (id: string) => {
      setFilters((prev) => {
        const newFilters = prev.includes(id)
          ? prev.filter((category) => category !== id)
          : [...prev, id];

        return newFilters;
      });
    },
    [setFilters],
  );

  const { isLoading, data, isFetchingNextPage, isRefetching, fetchNextPage } =
    useFoodList({
      filters,
      query,
      queryKey: QUERY_KEYS.SEARCH_FOOD,
    });

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <View style={styles.container}>
      <SearchInput onSearch={setQuery} ref={searchInputRef} />
      <Categories
        categories={CATEGORIES}
        categoriesValue={filters}
        onSelect={toggleFilter}
      />
      {isRefetching && <Loading fullScreen />}

      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <FoodList
          style={styles.list}
          data={data}
          onEndReached={handleEndReached}
          {...props}
        />
      )}

      {isFetchingNextPage ? (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="large" color={COLOR.GREEN} />
        </View>
      ) : null}
    </View>
  );
};

export default SearchFood;

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 16 },
  list: {
    marginTop: 15,
  },
});
