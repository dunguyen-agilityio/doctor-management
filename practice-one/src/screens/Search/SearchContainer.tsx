import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { Header, NotFound } from '@/components';

import { APP_ICONS, COLOR } from '@/constants';

import FiltersProvider from '@/contexts/filters';
import SearchProvider from '@/contexts/search';

import SearchFood from './SearchFood';

const SearchContainer = () => {
  return (
    <SearchProvider>
      <FiltersProvider>
        <View style={styles.container}>
          <Header />
          <SearchFood
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

export default memo(SearchContainer);

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
