import { Pressable, StyleSheet } from 'react-native';

import FoodImage, { FoodImageSize } from '@/components/FoodImage';

import type { IFood, TNutritional } from '@/types';

import { COLOR } from '@/theme';

import Text from '../Text';

export interface FoodCardProps
  extends Pick<IFood, 'imgUrl' | 'name' | 'id' | 'weight' | 'color'>,
    Pick<TNutritional, 'calories'> {
  onPress?: () => void;
  marginRight?: number;
  marginLeft?: number;
}

const FoodCard = ({
  calories,
  imgUrl,
  name,
  color,
  weight,
  marginLeft,
  marginRight,
  onPress,
}: FoodCardProps) => {
  return (
    <Pressable
      style={[styles.container, { marginLeft, marginRight }]}
      onPress={onPress}
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

export default FoodCard;

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
    borderColor: COLOR.LIGHT_GREY,
    borderWidth: 1,
    height: 192,
    minWidth: 154,
  },
  name: { marginTop: 14 },
  description: { marginTop: 10 },
});
