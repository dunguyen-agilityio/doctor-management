import { StyleSheet, View } from 'react-native';

import FiltersProvider from '@/contexts/filters/provider';
import FoodsProvider from '@/contexts/foods/provider';
import SearchProvider from '@/contexts/search/provider';

import { FoodsContainer, Header, NotFound } from '@/components';

import { COLORS, EmptyImage } from '@/constants';

import SearchContainer from './container';

const SearchScreen = () => {
  return (
    <SearchProvider>
      <FiltersProvider>
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
    paddingTop: 62,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
