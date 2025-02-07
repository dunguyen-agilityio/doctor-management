import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { RootScreenNavigationProps, RootStackParamsList } from '@navigation';
import { useFood } from '@hooks';
import {
  Back,
  Button,
  FoodImage,
  Ingredients,
  Nutritional,
  Text,
} from '@components';
import { CATEGORIES, DETAIL } from '@constants';

type DetailRoute = RouteProp<RootStackParamsList, typeof DETAIL>;

const Details = () => {
  const route = useRoute<DetailRoute>();
  const { goBack } = useNavigation<RootScreenNavigationProps<typeof DETAIL>>();

  const { id, onChange } = route.params;

  const { data, addFavorite, removeFavorite } = useFood(id);

  const [isMore, setIsMore] = useState(false);

  const handleReadMore = useCallback(() => {
    setIsMore((prev) => !prev);
  }, []);

  const handleFavorite = useCallback(async () => {
    let newData;
    if (data) {
      const { favorite } = data;

      if (favorite === 0) {
        if (addFavorite) newData = await addFavorite(id);
      } else if (removeFavorite) {
        newData = await removeFavorite(id);
      }

      if (newData && onChange) {
        onChange();
      }
    }
  }, [addFavorite, data, id, onChange, removeFavorite]);

  // Show error
  if (!data) {
    return null;
  }

  const {
    color,
    imgUrl,
    category,
    name,
    favorite,
    desc,
    ingredients,
    nutritional,
  } = data;

  const categoryName = CATEGORIES.find(({ id }) => id == category)?.name || '';

  return (
    <View style={styles.container}>
      <Back left={20} onPress={goBack} />

      <View style={styles.header}>
        <FoodImage imgUrl={imgUrl} color={color} type="large" />
        <Text fontWeight="700" fontSize="xxl-2">
          {name}
        </Text>
        <Text fontSize="xl-6">{categoryName}</Text>
      </View>

      <Nutritional nutritional={nutritional} />

      <View style={styles.details}>
        <Text fontSize="xxl-0" fontWeight="600">
          Details
        </Text>

        <Text fontSize="xl-5">
          {isMore ? desc : desc.substring(0, 150) + '...'}
          <Text
            onPress={handleReadMore}
            fontSize="xl-5"
            color="primary"
            customStyle={{ marginTop: 4 }}
          >
            {isMore ? `\bRead less.` : `\bRead more.`}
          </Text>
        </Text>

        {/* Display Ingrediants */}

        <Ingredients data={ingredients} />

        {/* add Favorite */}

        <Button
          width={'100%'}
          borderRadius={9}
          onPress={handleFavorite}
          customStyle={{ paddingVertical: 9, width: '100%', marginTop: 27 }}
          {...(favorite
            ? {
                type: 'secondary',
                label: 'UnFavorite',
              }
            : { type: 'primary', label: 'Add to Favorite' })}
        />
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 63,
    backgroundColor: '#fff',
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
  },
});
