import { useFavoriteStore } from '@/stores/favorite';

import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '@/components/Text';

import { COLOR } from '@/constants';

import { IFood } from '@/types';

interface FavoriteButtonProps {
  id: string;
  food: IFood;
}

const FavoriteButton = ({ id: foodId, food }: FavoriteButtonProps) => {
  const { favorites, addToFavorite, removeFromFavorite } = useFavoriteStore();

  const hasFavorite = useMemo(
    () => favorites.some(({ id }) => foodId === id),
    [favorites, foodId],
  );

  const handleFavorite = () => {
    hasFavorite ? removeFromFavorite(foodId) : addToFavorite(food);
  };

  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={handleFavorite}
        style={styles.button}
        testID="favorite-button"
      >
        <Text variant="subtitle1" color={COLOR.WHITE}>
          {hasFavorite ? 'Unfavorite' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  buttonWrapper: { paddingHorizontal: 10 },
  button: {
    width: '100%',
    borderRadius: 9,
    paddingVertical: 9,
    marginTop: 27,
    backgroundColor: COLOR.LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
