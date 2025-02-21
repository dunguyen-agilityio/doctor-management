import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@/navigation';

import {
  ArticlesSlider,
  Categories,
  FoodsContainer,
  Header,
  SearchInput,
} from '@/components';
import Text from '@/components/Text';

import { CATEGORIES, COLOR, ROUTES } from '@/constants';

import { MOCK_ARTICLES } from '@/mocks';

import { FoodsProvider } from '@/contexts/foods';

import HomeContainer from './HomeContainer';

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handleFilter = useCallback(
    (ids: string[]) => {
      navigate(ROUTES.SEARCH, { categories: ids });
    },
    [navigate],
  );

  const handleSearch = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);

  return (
    <FoodsProvider>
      <View style={styles.container}>
        <Header />
        <SearchInput onFocus={handleSearch} />
        <Categories onChange={handleFilter} categories={CATEGORIES} />
        <ArticlesSlider articles={MOCK_ARTICLES} />
        <HomeContainer>
          <FoodsContainer
            slotProps={{ list: { horizontal: true } }}
            ListTitleComponent={
              <Text variant="title3" style={styles.title}>
                All Food
              </Text>
            }
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
    backgroundColor: COLOR.WHITE,
  },
  list: { marginTop: 15 },
  title: {
    marginTop: 22,
    marginLeft: 8,
  },
});
