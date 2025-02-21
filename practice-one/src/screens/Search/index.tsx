import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootScreenNavigationProps, TabParamsList } from '@/navigation';

import { FoodsContainer, Header, NotFound } from '@/components';
import { EmptyImage } from '@/components/icons';

import { COLOR, ROUTES } from '@/constants';

import { FiltersProvider, FoodsProvider, SearchProvider } from '@/contexts';

import SearchContainer from './SearchContainer';

type SearchRoute = RouteProp<TabParamsList, typeof ROUTES.SEARCH>;

const SearchScreen = () => {
  const route = useRoute<SearchRoute>();

  const { setParams } =
    useNavigation<RootScreenNavigationProps<typeof ROUTES.SEARCH>>();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setParams({ categories: [] });
      };
    }, [setParams]),
  );

  return (
    <SearchProvider defaultValue={route.params?.query}>
      <FiltersProvider defaultValue={route.params?.categories}>
        <FoodsProvider>
          <View style={styles.container}>
            <Header />
            <SearchContainer>
              <FoodsContainer
                slotProps={{
                  list: {
                    ListEmptyComponent: (
                      <NotFound
                        image={<EmptyImage />}
                        description={`Try search for a different keyword or\n tweak your search a little`}
                        title="No Results Found"
                      />
                    ),
                  },
                }}
              />
            </SearchContainer>
          </View>
        </FoodsProvider>
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
