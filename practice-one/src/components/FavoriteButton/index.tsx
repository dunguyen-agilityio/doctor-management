import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { COLORS } from '@/constants';

import { IFood } from '@/types';

import { updateFood } from '@/services';

interface FavoriteButtonProps {
  favorite: boolean;
  id: string;
  onRefetch?: () => void;
}

const FavoriteButton = ({ favorite, id, onRefetch }: FavoriteButtonProps) => {
  const queryClient = useQueryClient();
  const [hasFavorite, setHasFavorite] = useState(favorite);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const food = queryClient.getQueryData<IFood>(['foods/' + id]);

      if (food) {
        const { favorite } = food;
        return updateFood({ ...food, favorite: favorite ? 0 : 1 });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['foods-favorite'] });
      setHasFavorite((prev) => !prev);
      onRefetch?.();
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
    >
      {isPending ? (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          testID="activity-indicator"
        />
      ) : (
        <Text style={styles.textButton}>
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
    backgroundColor: COLORS.PRIMARY,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
