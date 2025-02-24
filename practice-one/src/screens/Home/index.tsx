import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@/navigation';

import {
  ArticlesSlider,
  Categories,
  FoodContainer,
  FoodListSkeleton,
  Header,
  SearchInput,
  Text,
} from '@/components';

import { CATEGORIES, COLOR, ROUTES } from '@/constants';

import { MOCK_ARTICLES } from '@/mocks/article';

const HomeScreen = () => {
  const { navigate } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.HOME>>();

  const handleFilter = (id: string) => {
    navigate(ROUTES.SEARCH, { category: id });
  };

  const handleSearch = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    e?.currentTarget.blur(); // Ensuring blur happens first
    navigate(ROUTES.SEARCH, { autoFocus: true });
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchInput onFocus={handleSearch} />
      <Categories onSelect={handleFilter} categories={CATEGORIES} />
      <ArticlesSlider articles={MOCK_ARTICLES} />
      <FoodContainer
        slotProps={{
          list: {
            horizontal: true,
            ListHeaderComponent: (
              <Text variant="title3" style={styles.title}>
                All Food
              </Text>
            ),
          },
        }}
        Fallback={<FoodListSkeleton title="All Food" />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  title: {
    marginTop: 22,
    marginLeft: 8,
  },
});
