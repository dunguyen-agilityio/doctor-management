import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProps } from '@navigation';
import { Back, FoodImage, Nutritional } from '@components';
import { COLORS, DETAIL } from '@constants';
import { IFood } from '@types';

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
  children,
}: React.PropsWithChildren<FoodInfoProps>) => {
  const { goBack } = useNavigation<RootScreenNavigationProps<typeof DETAIL>>();

  return (
    <View style={styles.container}>
      <Back left={20} onPress={goBack} />
      <View style={styles.header}>
        <FoodImage imgUrl={imgUrl} color={color} type="large" />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Nutritional nutritional={nutritional} />
      <View style={styles.details}>
        <View style={styles.session}>
          <Text style={styles.title}>Details</Text>
          <Text style={styles.description}>
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
          </Text>
        </View>
        <View style={styles.session}>
          <Toggle>
            {({ isToggle, toggle }) => {
              const subIngredients = isToggle
                ? ingredients
                : ingredients.slice(0, 2);
              return (
                <>
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
                  <View style={styles.ingredients}>
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
                </>
              );
            }}
          </Toggle>
        </View>
        {children}
      </View>
    </View>
  );
};

export default FoodInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 63,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  details: {
    paddingHorizontal: 20,
    marginTop: 19,
    gap: 20,
  },
  button: {
    width: '100%',
    borderRadius: 9,
    paddingVertical: 9,
    marginTop: 27,
  },
  textButton: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.WHITE,
    textAlign: 'center',
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
    color: COLORS.LIGHT_1_GRAY,
  },
  readMore: { color: COLORS.PRIMARY },
  ingredients: {},
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ingredientText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.LIGHT_1_GRAY,
  },
  session: {
    gap: 4,
  },
  seeAll: {
    color: COLORS.PRIMARY,
    fontSize: 11,
    fontWeight: '500',
  },
  bullet: {
    fontSize: 20,
    marginRight: 8,
    color: COLORS.LIGHT_1_GRAY,
  },
  listBullet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Toggle = ({
  children,
}: {
  children: (params: {
    isToggle: boolean;
    setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
  }) => React.ReactNode;
}) => {
  const [isToggle, setIsToggle] = useState(false);
  return children({
    isToggle,
    setIsToggle,
    toggle: () => setIsToggle((prev) => !prev),
  });
};
