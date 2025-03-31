import {
  Container,
  FoodList,
  Loading,
  NotFound,
  SearchInput,
  VerticalFoodListSkeleton,
} from '@/components';

import { useFavorite } from '@/hooks/useFavorite';

const FavoriteScreen = () => {
  const { favorites, displayFavorites, isLoading, searchByName } =
    useFavorite();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  const isEmpty = favorites.length === 0;

  return (
    <Container gap={16} flex={1} paddingTop={55}>
      {isEmpty ? (
        <NotFound />
      ) : (
        <>
          <SearchInput onSearch={searchByName} />
          <FoodList
            data={displayFavorites}
            ListEmptyComponent={<VerticalFoodListSkeleton />}
          />
        </>
      )}
    </Container>
  );
};

export default FavoriteScreen;
