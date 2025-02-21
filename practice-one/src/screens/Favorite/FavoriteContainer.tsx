import { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { ErrorFallback, Loading, SearchInput } from '@/components';

import { QUERY_KEYS } from '@/constants';

import { useFoods, useSearchQuery } from '@/hooks';

const FavoriteContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { query, setQuery } = useSearchQuery();

  const searchInputRef = useRef<TextInput>(null);

  const { error, isLoading } = useFoods({
    query,
    queryKey: QUERY_KEYS.FOOD_FAVORITE,
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        searchInputRef.current?.clear();
      };
    }, []),
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
