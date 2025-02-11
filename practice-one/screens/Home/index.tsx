import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { Header, SearchInput, Cards, FoodsList, Text } from '@components';
import { COLORS, HOME, SEARCH } from '@constants';
import FoodCategories from '@components/FoodCategories';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@navigation';
import FoodsContainer from '@components/FoodsContainer';

const HomeScreen = () => {
  const { navigate } = useNavigation<RootScreenNavigationProps<typeof HOME>>();

  const handleNavigateToSearch = useCallback(() => {
    navigate(SEARCH);
  }, [navigate]);

  return (
    <FoodsContainer style={styles.container}>
      <Header />
      <SearchInput onFocus={handleNavigateToSearch} />
      <FoodCategories />
      <Cards />
      <FoodsList
        getIds={({ allIds }) => allIds}
        slots={{
          list: {
            horizontal: true,
            contentContainerStyle: { marginHorizontal: 16 },
          },
        }}
        title={
          <Text
            fontSize="xxl-0"
            fontWeight="700"
            customStyle={{ marginTop: 22, marginLeft: 8 }}
          >
            All Food
          </Text>
        }
      />
    </FoodsContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: COLORS.WHITE,
  },
});
