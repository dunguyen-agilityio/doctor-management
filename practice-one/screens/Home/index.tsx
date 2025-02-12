import { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

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

import { querySelector } from '@stores/filter';
import { idsSelector } from '@stores/food';

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handleNavigateToSearch = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <FoodsContainer style={styles.container} getQuery={querySelector}>
      <Header />
      <SearchInput onFocus={handleNavigateToSearch} getQuery={querySelector} />
      <FoodCategories />
      <Cards />
      <FoodsList
        style={styles.list}
        emptyContent={null}
        idsSelector={idsSelector}
        horizontal
        title={<Text style={styles.title}>All Food</Text>}
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
  list: { marginTop: 15 },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: 22,
    marginLeft: 8,
  },
});
