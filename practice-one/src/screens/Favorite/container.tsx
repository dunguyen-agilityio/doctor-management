import React, { useCallback, useContext, useRef } from 'react';
import { TextInput } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { SearchActionContext, SearchContext } from '@contexts/search/provider';

import { Loading, SearchInput } from '@components';
import ErrorFallback from '@components/Error';

import { useFoods } from '@hooks';

const FavoriteContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const query = useContext(SearchContext);
  const setQuery = useContext(SearchActionContext);

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
        if (searchInputRef.current) {
          searchInputRef.current.clear();
        }
      };
    }, [setQuery]),
  );

  if (error)
    return <ErrorFallback error={error} resetErrorBoundary={() => {}} />;

  return (
    <>
      <SearchInput onChangeText={setQuery} />
      {children}
      {isLoading && fallback}
    </>
  );
};

export default FavoriteContainer;
