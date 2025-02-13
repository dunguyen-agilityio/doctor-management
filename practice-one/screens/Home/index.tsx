import { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FoodsProvider from '@contexts/foods/provider';

import { RootScreenNavigationProps } from '@navigation';

import {
  Cards,
  FoodCategories,
  FoodsContainer,
  FoodsList,
  Header,
  SearchInput,
} from '@components';

import { COLORS, ROUTES } from '@constants';

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handleNavigateToSearch = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <FoodsProvider>
      <FoodsContainer
        style={styles.container}
        fallback={<Text>Loading...</Text>}
      >
        <Header />
        <SearchInput onFocus={handleNavigateToSearch} />
        <FoodCategories />
        <Cards />
        <FoodsList
          style={styles.list}
          horizontal
          title={<Text style={styles.title}>All Food</Text>}
        />
      </FoodsContainer>
    </FoodsProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: COLORS.WHITE,
  },
  list: { marginTop: 15 },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: 22,
    marginLeft: 8,
  },
});
