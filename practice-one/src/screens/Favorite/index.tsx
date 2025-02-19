import { StyleSheet, View } from 'react-native';

import { FoodsContainer, NotFound } from '@/components';

import { COLOR } from '@/constants';

import { FoodsProvider } from '@/contexts/foods';
import { SearchProvider } from '@/contexts/search';

import FavoriteContainer from './FavoriteContainer';

const FavoriteScreen = () => {
  return (
    <SearchProvider>
      <FoodsProvider>
        <View style={styles.container}>
          <FavoriteContainer>
            <FoodsContainer
              slotProps={{
                list: {
                  ListEmptyComponent: <NotFound />,
                },
              }}
            />
          </FavoriteContainer>
        </View>
      </FoodsProvider>
    </SearchProvider>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 62,
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  list: {
    marginTop: 24,
    width: '100%',
  },
});
