import { StyleSheet, View } from 'react-native';

import { FoodList, Loading, NotFound, SearchInput } from '@/components';

import { COLOR } from '@/constants';

import { useFavorite } from '@/hooks/useFavorite';

const FavoriteScreen = () => {
  const { favorites, displayFavorites, isLoading, searchByName } =
    useFavorite();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  const isEmpty = favorites.length === 0;

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <NotFound />
      ) : (
        <>
          <SearchInput onSearch={searchByName} />
          <FoodList data={displayFavorites} ListEmptyComponent={<NotFound />} />
        </>
      )}
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
});
