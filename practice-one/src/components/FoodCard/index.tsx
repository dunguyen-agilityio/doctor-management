import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import FoodImage, { FoodImageSize } from '@/components/FoodImage';

import { COLOR } from '@/constants';

import { IFood, TNutritional } from '@/types';

import Text from '../Text';

export interface FoodCardProps
  extends Pick<IFood, 'imgUrl' | 'name' | 'id' | 'weight' | 'color'>,
    Pick<TNutritional, 'calories'> {
  onPress?: (id: string) => void;
  marginRight?: number;
  marginLeft?: number;
}

const FoodCard = ({
  calories,
  imgUrl,
  name,
  id,
  color,
  weight,
  marginLeft,
  marginRight,
  onPress,
}: FoodCardProps) => {
  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <Pressable
      style={[styles.container, { marginLeft, marginRight }]}
      onPress={handlePress}
    >
      <FoodImage color={color} imgUrl={imgUrl} type={FoodImageSize.medium} />
      <Text variant="title2" style={styles.name}>
        {name}
      </Text>
      <Text
        variant="body2"
        style={styles.description}
      >{`${calories} cal/${weight} kg`}</Text>
    </Pressable>
  );
};

export default memo(FoodCard);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLOR.WHITE,
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
  name: { marginTop: 14 },
  description: { marginTop: 10 },
});
