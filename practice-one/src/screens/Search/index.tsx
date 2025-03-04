import { Image } from 'expo-image';

import { StyleSheet, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';

import { TabParamsList } from '@/navigation';

import { Header, NotFound } from '@/components';

import { APP_ICONS, COLOR, ROUTES } from '@/constants';

import FiltersProvider from '@/contexts/filters';
import SearchProvider from '@/contexts/search';

import SearchFood from './SearchFood';

type SearchRoute = RouteProp<TabParamsList, typeof ROUTES.SEARCH>;

const SearchScreen = () => {
  const route = useRoute<SearchRoute>();

  const defaultParams = route.params ?? {};
  const { category, autoFocus } = defaultParams;

  return (
    <SearchProvider>
      <FiltersProvider initial={category}>
        <View style={styles.container}>
          <Header />
          <SearchFood
            autoFocus={autoFocus}
            ListEmptyComponent={
              <NotFound
                image={
                  <Image source={APP_ICONS.EMPTY} style={styles.emptyImage} />
                }
                description="Try searching with a different keyword or tweak your search a little."
                title="No Results Found"
              />
            }
            ListFooterComponentStyle={{
              alignSelf: 'center',
              marginVertical: 16,
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
  emptyImage: {
    width: 108,
    height: 96,
  },
});
