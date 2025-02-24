import { CategoriesWithContext } from '@/hocs/CategoriesWithContext';

import { useCallback, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootScreenNavigationProps, TabParamsList } from '@/navigation';

import { Header, SearchInput } from '@/components';

import { COLOR, ROUTES } from '@/constants';

import FiltersProvider from '@/contexts/filters';
import SearchProvider from '@/contexts/search';

import SearchContainer from './SearchContainer';

type SearchRoute = RouteProp<TabParamsList, typeof ROUTES.SEARCH>;
type SearchNavigation = RootScreenNavigationProps<typeof ROUTES.SEARCH>;

const SearchScreen = () => {
  const route = useRoute<SearchRoute>();
  const { setParams } = useNavigation<SearchNavigation>();
  const searchInputRef = useRef<TextInput>(null);

  const defaultParams = route.params ?? {};
  const { category, autoFocus = false } = defaultParams;

  useFocusEffect(
    useCallback(() => {
      if (autoFocus) {
        searchInputRef.current?.focus();
      }

      return () => {
        setParams({
          autoFocus: false,
        });
      };
    }, [autoFocus, setParams]),
  );

  return (
    <SearchProvider>
      <FiltersProvider initial={category}>
        <View style={styles.container}>
          <Header />
          <SearchInput autoFocus={autoFocus} ref={searchInputRef} />
          <CategoriesWithContext />
          <SearchContainer />
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
