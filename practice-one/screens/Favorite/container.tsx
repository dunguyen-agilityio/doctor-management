import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { SearchContext } from '@contexts/search/provider';

import { FoodsContainer } from '@components';

const FavoriteContainer = ({ children }: React.PropsWithChildren) => {
  const query = useContext(SearchContext);

  return (
    <FoodsContainer
      style={styles.container}
      options={{ query, favorite: 1, queryKey: 'foods-favorite' }}
    >
      {children}
    </FoodsContainer>
  );
};

export default FavoriteContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 62,
  },
});
