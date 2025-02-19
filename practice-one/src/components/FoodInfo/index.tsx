import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FoodImage, Nutritional, Toggle } from '@/components';

import { COLOR } from '@/constants';

import { IFood } from '@/types';

import { FoodImageSize } from '../FoodImage';

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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Nutritional nutritional={nutritional} />
      <View style={styles.details}>
        <View style={styles.session}>
          <Text style={styles.title}>Details</Text>
          <Text style={styles.description}>
            {desc.length > 150 ? (
              <Toggle>
                {({ isToggle, toggle }) => (
                  <>
                    {isToggle ? desc : desc.substring(0, 150) + '...'}
                    <Text
                      onPress={toggle}
                      style={[styles.description, styles.readMore]}
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
                  <Text style={styles.title}>Ingredients</Text>
                  <Text onPress={toggle} style={styles.seeAll}>
                    {isToggle ? `\bSee less.` : `\bSee all`}
                  </Text>
                </View>
                <View>
                  {subIngredients.map(({ id, name, value }, idx) => (
                    <View style={styles.ingredientItem} key={id + idx}>
                      <View style={styles.listBullet}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.ingredientText}>{name}</Text>
                      </View>
                      <Text
                        style={styles.ingredientText}
                      >{`${value} cal`}</Text>
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
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  category: {
    fontSize: 16,
  },
  title: { fontSize: 20, fontWeight: '600' },
  description: {
    fontSize: 15,
    color: COLOR.LIGHT_1_GRAY,
  },
  readMore: { color: COLOR.PRIMARY },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ingredientText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLOR.LIGHT_1_GRAY,
  },
  session: {
    gap: 4,
  },
  seeAll: {
    color: COLOR.PRIMARY,
    fontSize: 11,
    fontWeight: '500',
  },
  bullet: {
    fontSize: 20,
    marginRight: 8,
    color: COLOR.LIGHT_1_GRAY,
  },
  listBullet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
