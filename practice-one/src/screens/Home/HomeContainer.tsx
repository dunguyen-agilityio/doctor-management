import React from 'react';

import { Loading } from '@/components';
import ErrorFallback from '@/components/ErrorFallback';

import { useFoods } from '@/hooks';

const HomeContainer = ({
  children,
  fallback = <Loading />,
}: React.PropsWithChildren<{ fallback?: React.ReactNode }>) => {
  const { error, isLoading } = useFoods({
    queryKey: 'foods',
  });

  if (error) return <ErrorFallback error={error} />;

  return (
    <>
      {children}
      {isLoading && fallback}
    </>
  );
};

export default HomeContainer;
