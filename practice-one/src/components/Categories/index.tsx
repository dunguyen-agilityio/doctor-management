import { ScrollView } from 'react-native-gesture-handler';

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CATEGORIES } from '@/constants';

import { ICategory } from '@/types';

import CategoryItem from './CategoryItem';

export interface ICategories {
  categories?: ICategory[];
  categoriesValue?: string[];
  onSelect?: (select: string) => void;
}

const Categories = ({
  categories = [],
  categoriesValue = [],
  onSelect,
}: ICategories) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.contentContainerStyle}
      >
        {categories.map(({ name, id }, idx) => {
          const isActive = categoriesValue.includes(String(id));

          return (
            <CategoryItem
              testID="category-item"
              key={id}
              marginLeft={idx == 0 ? 16 : 0}
              marginRight={idx == CATEGORIES.length - 1 ? 16 : 0}
              onPressItem={onSelect}
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
