import React, { useCallback, useRef } from 'react';
import { TextInput, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Categories, Loading, SearchInput } from '@/components';
import ErrorFallback from '@/components/ErrorFallback';

import { CATEGORIES } from '@/constants';

import { useFoods, useSearchQuery } from '@/hooks';
import { useFilters } from '@/hooks';

const SearchContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { query, setQuery } = useSearchQuery();
  const { filters: categories, setFilters } = useFilters();
  const { error, isLoading } = useFoods({ categories, query });
  const searchInputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery('');
        setFilters([]);
        if (searchInputRef.current) {
          searchInputRef.current.clear();
        }
      };
    }, [setFilters, setQuery]),
  );

  const handlePressTag = useCallback(
    (id: string) => {
      setFilters((prev) => {
        const newTags = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];

        return newTags;
      });
    },
    [setFilters],
  );

  if (error) return <ErrorFallback error={error} />;

  return (
    <View style={{ flex: 1 }}>
      <SearchInput ref={searchInputRef} onChangeText={setQuery} />
      <Categories
        categories={CATEGORIES}
        onSelect={handlePressTag}
        values={categories}
      />
      {children}
      {isLoading && fallback}
    </View>
  );
};

export default SearchContainer;
