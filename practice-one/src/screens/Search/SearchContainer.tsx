import { useCallback, useRef } from 'react';
import { TextInput, View } from 'react-native';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { Categories, ErrorFallback, Loading, SearchInput } from '@/components';

import { CATEGORIES } from '@/constants';

import { useFilters, useFoods, useSearchQuery } from '@/hooks';

const SearchContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { query, setQuery } = useSearchQuery();
  const { filters: categories, setFilters } = useFilters();
  const { error, isLoading } = useFoods({ categories, query });
  const searchInputRef = useRef<TextInput>(null);

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }, []),
  );

  if (error) return <ErrorFallback error={error} />;

  return (
    <View style={{ flex: 1 }}>
      <SearchInput
        ref={searchInputRef}
        onChangeText={setQuery}
        autoFocus={isFocused}
      />
      <Categories
        categories={CATEGORIES}
        onChange={setFilters}
        values={categories}
      />
      {children}
      {isLoading && fallback}
    </View>
  );
};

export default SearchContainer;
