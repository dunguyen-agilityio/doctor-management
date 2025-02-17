import React, { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Loading, SearchInput } from '@/components';
import ErrorFallback from '@/components/ErrorFallback';

import { useFoods } from '@/hooks';
import { useSearchQuery } from '@/hooks';

const FavoriteContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { query, setQuery } = useSearchQuery();

  const searchInputRef = useRef<TextInput>(null);

  const { error, isLoading } = useFoods({
    query,
    favorite: 1,
    queryKey: 'foods-favorite',
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery('');
        searchInputRef.current?.clear();
      };
    }, [setQuery]),
  );

  if (error) return <ErrorFallback error={error} />;

  return (
    <>
      <SearchInput onChangeText={setQuery} />
      {children}
      {isLoading && fallback}
    </>
  );
};

export default FavoriteContainer;
