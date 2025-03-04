import { useCallback, useRef } from 'react';
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@/navigation';

import { Categories, FoodList, Loading, SearchInput } from '@/components';
import { FoodListProps } from '@/components/FoodList';

import { CATEGORIES, COLOR, QUERY_KEYS, ROUTES } from '@/constants';

import { useFilters } from '@/hooks/useFilters';
import { useFoodList } from '@/hooks/useFoodList';
import { useSearchQuery } from '@/hooks/useSearchQuery';

type SearchNavigation = RootScreenNavigationProps<typeof ROUTES.SEARCH>;

const SearchFood = ({
  autoFocus,
  ...otherProps
}: FoodListProps & { autoFocus?: boolean }) => {
  const { setParams } = useNavigation<SearchNavigation>();

  const searchInputRef = useRef<TextInput>(null);

  const { filters, setFilters } = useFilters();
  const { query, setQuery } = useSearchQuery();

  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useFoodList({
    categoriesValue: filters,
    query,
    queryKey: QUERY_KEYS.SEARCH_FOOD,
  });

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFilters((prev) => {
          const isFilter = !prev.length;

          if (isFilter) {
            setParams({
              category: undefined,
            });
          }

          return prev;
        });
      };
    }, [setParams, setFilters]),
  );

  useFocusEffect(
    useCallback(() => {
      if (autoFocus) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }

      return () => {
        setQuery('');
        searchInputRef.current?.clear();

        if (autoFocus) {
          setParams({
            autoFocus: false,
          });
        }
      };
    }, [autoFocus, setParams, setQuery]),
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

  return (
    <>
      <SearchInput onSearch={setQuery} ref={searchInputRef} />
      <Categories
        categories={CATEGORIES}
        categoriesValue={filters}
        onSelect={toggleFilter}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <FoodList
          style={styles.list}
          data={data}
          onEndReached={handleEndReached}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color={COLOR.GREEN} />
            ) : null
          }
          {...otherProps}
        />
      )}
    </>
  );
};

export default SearchFood;

const styles = StyleSheet.create({
  list: {
    marginTop: 15,
  },
});
