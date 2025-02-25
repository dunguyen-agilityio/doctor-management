import { forwardRef } from 'react';
import { TextInput } from 'react-native';

import { useSearchQuery } from '@/hooks/useSearchQuery';

const withSearch = <T,>(
  Component: (
    props: React.PropsWithoutRef<T>,
    ref: React.ForwardedRef<TextInput>,
  ) => React.ReactNode,
) => {
  const WithSearchFood = (
    props: React.PropsWithoutRef<T>,
    ref: React.ForwardedRef<TextInput>,
  ) => {
    const { query, setQuery } = useSearchQuery();

    return <Component {...props} query={query} onSearch={setQuery} ref={ref} />;
  };

  return forwardRef<TextInput, T>(WithSearchFood);
};

export default withSearch;
