import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLOR } from '@/constants';

import { addFoodToFavorite, removeFoodToFavorite } from '@/services';

import Text from '../Text';

interface FavoriteButtonProps {
  favorite?: boolean;
  id: string;
  favoriteId?: string;
}

const FavoriteButton = ({ favorite, id, favoriteId }: FavoriteButtonProps) => {
  const queryClient = useQueryClient();
  const [hasFavorite, setHasFavorite] = useState(favorite);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (favorite && favoriteId) {
        await removeFoodToFavorite(favoriteId);
      } else {
        await addFoodToFavorite(id);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['foods-favorite'] });
      await queryClient.invalidateQueries({ queryKey: [`food-${id}`] });
      setHasFavorite((prev) => !prev);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Updated success!', ToastAndroid.SHORT);
      }
    },
  });

  const handleFavorite = () => {
    mutate();
  };

  return (
    <TouchableOpacity
      onPress={handleFavorite}
      style={styles.button}
      disabled={isPending}
      testID="favorite-button"
    >
      {isPending ? (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          testID="activity-indicator"
        />
      ) : (
        <Text variant="subtitle1" color={COLOR.WHITE}>
          {hasFavorite ? 'UnFavorites' : 'Add to Favorites'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 9,
    paddingVertical: 9,
    marginTop: 27,
    backgroundColor: COLOR.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
