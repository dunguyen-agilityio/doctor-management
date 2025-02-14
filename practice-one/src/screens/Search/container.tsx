import React, { useCallback, useContext, useRef } from 'react';
import { TextInput, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  FiltersActionContext,
  FiltersContext,
} from '@/contexts/filters/provider';
import { SearchActionContext, SearchContext } from '@/contexts/search/provider';

import { Categories, Loading, SearchInput } from '@/components';
import ErrorFallback from '@/components/Error';

import { CATEGORIES } from '@/constants';

import { useFoods } from '@/hooks';

const SearchContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const query = useContext(SearchContext);
  const categories = useContext(FiltersContext);
  const { error, isLoading } = useFoods({ categories, query });
  const searchInputRef = useRef<TextInput>(null);
  const setFilters = useContext(FiltersActionContext);
  const setQuery = useContext(SearchActionContext);

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

  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={() => {}} />;

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
