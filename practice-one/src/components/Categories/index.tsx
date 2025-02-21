import { ScrollView } from 'react-native-gesture-handler';

import { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CATEGORIES } from '@/constants';

import { ICategory } from '@/types';

import CategoryItem from './CategoryItem';

export interface ICategories {
  categories: ICategory[];
  values?: string[];
  onChange?: (values: string[]) => void;
}

const Categories = ({
  categories,
  values: initial = [],
  onChange,
}: ICategories) => {
  const [values, setValues] = useState(initial);

  const handleSelect = (id: string) => {
    setValues((prev) => {
      const set = new Set(prev);

      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
      }

      const newValues = Array.from(set);

      onChange?.(newValues);
      return newValues;
    });
  };

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
            <CategoryItem
              key={id}
              marginLeft={idx == 0 ? 16 : 0}
              marginRight={idx == CATEGORIES.length - 1 ? 16 : 0}
              onPressItem={handleSelect}
              isActive={isActive}
              id={id}
            >
              {name}
            </CategoryItem>
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
});
