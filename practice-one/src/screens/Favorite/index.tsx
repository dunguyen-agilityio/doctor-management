import { StyleSheet, View } from 'react-native';

import { FoodList, Loading, NotFound, SearchInput } from '@/components';

import { COLOR } from '@/constants';

import { useFavorite } from '@/hooks/useFavorite';

const FavoriteScreen = () => {
  const { isLoading, favorites, displayFavorites, searchByName } =
    useFavorite();

  if (isLoading) {
    return <Loading />;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <NotFound />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput onChangeText={searchByName} />
      <FoodList data={displayFavorites} />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
