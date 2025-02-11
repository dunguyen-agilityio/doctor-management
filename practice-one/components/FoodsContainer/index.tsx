import { Loading, Text } from '@components';

import { View, ViewProps } from 'react-native';
import { useFoods, useFoodsFavorite } from '@hooks';
import React from 'react';

const FoodsContainer = ({
  children,
  favorite,
  ...rest
}: React.PropsWithChildren<ViewProps & { favorite?: 0 | 1 }>) => {
  const { isError, isLoading } = (favorite ? useFoodsFavorite : useFoods)();

  if (isError) {
    return <Text>Error</Text>;
  }

  return (
    <View {...rest}>
      {children}
      {isLoading && <Loading />}
    </View>
  );
};

export default FoodsContainer;
