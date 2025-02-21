import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { FoodImage, Nutritional, Toggle } from '@/components';

import { COLOR } from '@/constants';

import { IFood } from '@/types';

import { FoodImageSize } from '../FoodImage';
import Text from '../Text';

interface FoodInfoProps
  extends Omit<IFood, 'category' | 'id' | 'favorite' | 'weight'> {
  category: string;
}

const FoodInfo = ({
  color,
  imgUrl,
  category,
  name,
  desc,
  ingredients,
  nutritional,
}: FoodInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FoodImage imgUrl={imgUrl} color={color} type={FoodImageSize.large} />
        <Text variant="title1">{name}</Text>
        <Text variant="body6">{category}</Text>
      </View>
      <Nutritional nutritional={nutritional} />
      <View style={styles.details}>
        <View style={styles.session}>
          <Text variant="subtitle1">Details</Text>
          <Text variant="body7" color={COLOR.GRAY}>
            {desc.length > 150 ? (
              <Toggle>
                {({ isToggle, toggle }) => (
                  <>
                    {isToggle ? desc : desc.substring(0, 150) + '...'}
                    <Text
                      variant="body7"
                      color={COLOR.PRIMARY}
                      onPress={toggle}
                    >
                      {isToggle ? `\bRead less.` : `\bRead more.`}
                    </Text>
                  </>
                )}
              </Toggle>
            ) : (
              desc
            )}
          </Text>
        </View>
        <Toggle>
          {({ isToggle, toggle }) => {
            const subIngredients = isToggle
              ? ingredients
              : ingredients.slice(0, 2);
            return (
              <View style={styles.session}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <Text variant="subtitle1">Ingredients</Text>
                  <Text onPress={toggle} color={COLOR.PRIMARY} variant="body5">
                    {isToggle ? `\bSee less.` : `\bSee all`}
                  </Text>
                </View>
                <View>
                  {subIngredients.map(({ id, name, value }, idx) => (
                    <View style={styles.ingredientItem} key={id + idx}>
                      <View style={styles.listBullet}>
                        <Text variant="subtitle3">•</Text>
                        <Text variant="subtitle3">{name}</Text>
                      </View>
                      <Text variant="subtitle3">{`${value} cal`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          }}
        </Toggle>
      </View>
    </View>
  );
};

export default memo(FoodInfo);

const styles = StyleSheet.create({
  container: { gap: 4 },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  details: {
    marginTop: 19,
    gap: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  session: {
    gap: 4,
  },
  listBullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
