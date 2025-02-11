import React, { memo, useCallback } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { IFood } from '@types';
import { COLORS } from '@constants';
import FoodImage from '../FoodImage';

type FOOD_TYPES = 'medium' | 'large';

const Food = ({
  data,
  disabled = false,
  onPress,
  style,
}: {
  data: IFood;
  type?: FOOD_TYPES;
  disabled?: boolean;
  onPress?: (id: number) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const { name, weight, nutritional, id, color, imgUrl } = data;
  const { calories } = nutritional || { calories: {} };

  const handlePress = useCallback(() => {
    onPress && onPress(id);
  }, [id, onPress]);

  return (
    <Pressable
      disabled={disabled}
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <FoodImage color={color} imgUrl={imgUrl} type="medium" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{`${calories} cal/${weight} kg`}</Text>
    </Pressable>
  );
};

export default memo(Food);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 27,
    paddingVertical: 17,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    height: 192,
    minWidth: 154,
  },
  name: { marginTop: 14, fontSize: 17, fontWeight: '700' },
  description: { marginTop: 10, fontSize: 13, fontWeight: '400' },
});
