import { ScrollView, StyleSheet } from 'react-native';

import type { TOption } from '@/types';

import CategoryItem from './CategoryItem';

interface CategoriesProps {
  options?: TOption[];
  values?: string[];
  onChange?: (categories: string[]) => void;
}

const Categories = ({
  options = [],
  values = [],
  onChange,
}: CategoriesProps) => {
  const handleChange = (select: string) => {
    const exits = values.includes(select);

    const newCategories = exits
      ? values.filter((category) => category !== select)
      : [...values, select];

    onChange?.(newCategories);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      contentContainerStyle={styles.container}
      testID="categories"
    >
      {options.map(({ name, value }, idx) => {
        const isActive = values.includes(value);

        return (
          <CategoryItem
            testID="category-item"
            key={String(value)}
            marginLeft={idx == 0 ? 16 : 0}
            marginRight={idx == options.length - 1 ? 16 : 0}
            onPressItem={handleChange}
            isActive={isActive}
            value={value}
          >
            {name}
          </CategoryItem>
        );
      })}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
