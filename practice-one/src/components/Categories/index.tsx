import { ScrollView } from 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';

import { CATEGORIES } from '@/constants';

import { ICategory } from '@/types';

import CategoryItem from './CategoryItem';

export interface ICategories {
  categories: ICategory[];
  values?: string[];
  onSelect?: (select: string) => void;
}

const Categories = ({ categories, values = [], onSelect }: ICategories) => {
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

export default Categories;

const styles = StyleSheet.create({
  container: {
    height: 26,
    marginTop: 16,
  },
  contentContainerStyle: { gap: 16 },
});
