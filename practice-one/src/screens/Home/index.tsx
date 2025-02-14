import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MOCK_ARTICLES } from '@__mock__';
import FoodsProvider from '@contexts/foods/provider';

import { RootScreenNavigationProps } from '@navigation';

import {
  ArticlesSlider,
  Categories,
  FoodsContainer,
  Header,
  SearchInput,
} from '@components';

import { CATEGORIES, COLORS, ROUTES } from '@constants';

import HomeContainer from './container';

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handleNavigateToSearch = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <FoodsProvider>
      <View style={styles.container}>
        <Header />
        <SearchInput onFocus={handleNavigateToSearch} />
        <Categories onSelect={handleNavigateToSearch} categories={CATEGORIES} />
        <ArticlesSlider articles={MOCK_ARTICLES} />
        <HomeContainer>
          <FoodsContainer
            slotProps={{ list: { horizontal: true } }}
            ListTitleComponent={<Text style={styles.title}>All Food</Text>}
          />
        </HomeContainer>
      </View>
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
