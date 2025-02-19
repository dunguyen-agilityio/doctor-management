import { ScrollView } from 'react-native-gesture-handler';

import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLOR } from '@/constants';
import { CATEGORIES } from '@/constants';

import { ICategory } from '@/types';

import Text from '../Text';

export interface ICategories {
  onSelect?: (id: string) => void;
  categories: ICategory[];
  values?: string[];
}

const Categories = ({ onSelect, categories, values = [] }: ICategories) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.contentContainerStyle}
      >
        {categories.map(({ name, id }, idx) => {
          const isActive = values.includes(String(id));

          return (
            <TouchableOpacity
              key={id}
              style={[
                styles.button,
                isActive && styles.buttonActive,
                {
                  ...(idx == 0 && { marginLeft: 16 }),
                  ...(idx == CATEGORIES.length - 1 && { marginRight: 16 }),
                },
              ]}
              onPress={() => onSelect?.(id)}
            >
              <Text variant="body1">{name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(Categories);

const styles = StyleSheet.create({
  container: {
    height: 26,
    marginTop: 16,
  },
  contentContainerStyle: { gap: 16 },
  item: {
    marginLeft: 7,
  },
  buttonActive: {
    backgroundColor: COLOR.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLOR.GREEN,
  },
  button: {
    backgroundColor: COLOR.LIGHT_GRAY,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
