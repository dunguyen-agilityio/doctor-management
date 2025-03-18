import { StyleSheet } from 'react-native';

import { Button, Text } from '@/components';

import { COLOR } from '@/constants';

import type { IFood } from '@/types';

import { useFavorite } from '@/hooks/useFavorite';

const FavoriteButton = ({ food }: { food: IFood }) => {
  const { id: foodId } = food;

  const { favorites, addToFavorite, removeFromFavorite } = useFavorite();

  const hasFavorite = favorites.some(({ id }) => foodId === id);

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
