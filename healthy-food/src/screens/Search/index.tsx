import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';

import { RootScreenNavigationProps, RootStackParamsList } from '@/navigation';

import {
  Categories,
  FoodList,
  Header,
  Loading,
  NotFound,
  SearchInput,
} from '@/components';

import {
  APP_ICONS,
  CATEGORIES,
  COLOR,
  QUERY_KEYS,
  ROUTES,
  VERTICAL_PAGE_SIZE,
} from '@/constants';

import { useFoodList } from '@/hooks/useFoodList';

type SearchNavigation = RootScreenNavigationProps<typeof ROUTES.SEARCH>;

type Props = NativeStackScreenProps<RootStackParamsList, ROUTES.SEARCH>;

const SearchScreen = ({ route }: Props) => {
  const { setParams } = useNavigation<SearchNavigation>();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const searchInputRef = useRef<TextInput>(null);

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

  const toggleFilter = (id: string) => {
    setFilters((prev) => {
      const newFilters = prev.includes(id)
        ? prev.filter((category) => category !== id)
        : [...prev, id];

      return newFilters;
    });
  };

  const { isLoading, data, isFetchingNextPage, isRefetching, fetchNextPage } =
    useFoodList({
      filters,
      query,
      queryKey: QUERY_KEYS.FOOD,
      pageSize: VERTICAL_PAGE_SIZE,
    });

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderFooter = () => {
    if (isFetchingNextPage) return null;

    return <ActivityIndicator size="large" color={COLOR.GREEN} />;
  };

  return (
    <View style={styles.container}>
      <Header />
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
            ListEmptyComponent={
              <NotFound
                image={
                  <Image source={APP_ICONS.EMPTY} style={styles.emptyImage} />
                }
                description="Try searching with a different keyword or tweak your search a little."
                title="No Results Found"
              />
            }
            ListFooterComponentStyle={styles.footer}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  emptyImage: {
    width: 108,
    height: 96,
  },
  list: {
    marginTop: 15,
  },
  footer: { alignSelf: 'center', paddingTop: 10, paddingBottom: 30 },
});
