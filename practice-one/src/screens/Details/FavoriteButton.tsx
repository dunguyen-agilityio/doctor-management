import { useFavoriteStore } from '@/stores/favorite';

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Text } from '@/components';

import { COLOR } from '@/constants';

import type { IFood } from '@/types';

const FavoriteButton = ({ food }: { food: IFood }) => {
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
    <Button onPress={toggleFavorite} style={styles.button}>
      <Text variant="subtitle1" color={COLOR.WHITE}>
        {hasFavorite ? 'Unfavorite' : 'Add to Favorites'}
      </Text>
    </Button>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
