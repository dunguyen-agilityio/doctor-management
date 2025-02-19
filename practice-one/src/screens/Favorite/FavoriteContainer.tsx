import { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { ErrorFallback, Loading, SearchInput } from '@/components';

import { useFavoriteFoods, useSearchQuery } from '@/hooks';

const FavoriteContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { query, setQuery } = useSearchQuery();

  const searchInputRef = useRef<TextInput>(null);

  const { error, isLoading } = useFavoriteFoods({ query });

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
