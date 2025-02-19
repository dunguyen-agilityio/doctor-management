import { StyleSheet, View } from 'react-native';

import { FoodsContainer, Header, NotFound } from '@/components';
import { EmptyImage } from '@/components/icons';

import { COLOR } from '@/constants';

import { FiltersProvider, FoodsProvider, SearchProvider } from '@/contexts';

import SearchContainer from './SearchContainer';

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
    // paddingTop: 62,
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});
