import { useFavoriteStore } from '@/stores/favorite';

import { useMemo } from 'react';

import { IFood } from '@/types';

type TWithFavorite<T> = T & {
  food: IFood;
};

const withFavorite = <T,>(
  Component: (props: React.PropsWithChildren<T>) => React.ReactNode,
  renderContent?: (value: boolean) => React.ReactNode,
) => {
  const WithFavorite = (props: TWithFavorite<T>) => {
    const { food } = props;
    const { id: foodId } = food;

    const { favorites, addToFavorite, removeFromFavorite } = useFavoriteStore();

    const hasFavorite = useMemo(
      () => favorites.some(({ id }) => foodId === id),
      [favorites, foodId],
    );

    const toggleFavorite = () => {
      hasFavorite ? removeFromFavorite(foodId) : addToFavorite(food);
    };

    return (
      <Component {...props} onPress={toggleFavorite}>
        {renderContent?.(hasFavorite)}
      </Component>
    );
  };

  return WithFavorite;
};

export default withFavorite;
