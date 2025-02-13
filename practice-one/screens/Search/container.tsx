import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { FiltersContext } from '@contexts/filters/provider';
import { SearchContext } from '@contexts/search/provider';

import { FoodsContainer } from '@components';

const SearchContainer = ({ children }: React.PropsWithChildren) => {
  const query = useContext(SearchContext);
  const categories = useContext(FiltersContext);

  return (
    <FoodsContainer style={styles.container} options={{ query, categories }}>
      {children}
    </FoodsContainer>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 62,
  },
});
