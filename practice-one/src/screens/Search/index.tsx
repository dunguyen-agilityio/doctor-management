import withFilters from '@/hocs/withFilters';
import withSearch from '@/hocs/withSearch';

import { useCallback, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootScreenNavigationProps, TabParamsList } from '@/navigation';

import { Categories, Header, SearchInput } from '@/components';
import { FoodContainer, Loading, NotFound } from '@/components';
import { EmptyImage } from '@/components/icons';

import { CATEGORIES, COLOR, ROUTES } from '@/constants';

import FiltersProvider from '@/contexts/filters';
import SearchProvider from '@/contexts/search';

type SearchRoute = RouteProp<TabParamsList, typeof ROUTES.SEARCH>;
type SearchNavigation = RootScreenNavigationProps<typeof ROUTES.SEARCH>;

const FoodContainerWithSearchAndFilters = withFilters(
  withSearch(FoodContainer),
);
const CategoriesWithContext = withFilters(Categories);
const SearchInputWithContext = withSearch(SearchInput);

const SearchScreen = () => {
  const route = useRoute<SearchRoute>();
  const { setParams } = useNavigation<SearchNavigation>();
  const searchInputRef = useRef<TextInput>(null);

  const defaultParams = route.params ?? {};
  const { category, autoFocus = false } = defaultParams;

  useFocusEffect(
    useCallback(() => {
      if (autoFocus) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);

        return () => {
          setParams({
            autoFocus: false,
          });
        };
      }

      if (category) {
        return () => {
          setParams({
            category: undefined,
          });
        };
      }
    }, [autoFocus, setParams, category]),
  );

  return (
    <SearchProvider>
      <FiltersProvider initial={category}>
        <View style={styles.container}>
          <Header />
          <SearchInputWithContext autoFocus={autoFocus} ref={searchInputRef} />
          <CategoriesWithContext categories={CATEGORIES} />
          <FoodContainerWithSearchAndFilters
            Fallback={<Loading />}
            slotProps={{
              list: {
                ListEmptyComponent: (
                  <NotFound
                    image={<EmptyImage />}
                    description="Try searching with a different keyword or tweak your search a little."
                    title="No Results Found"
                  />
                ),
                ListFooterComponent: (
                  <ActivityIndicator size="large" color={COLOR.GREEN} />
                ),
                ListFooterComponentStyle: {
                  alignSelf: 'center',
                  marginVertical: 16,
                },
              },
            }}
          />
        </View>
      </FiltersProvider>
    </SearchProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});
