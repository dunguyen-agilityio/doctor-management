import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { memo, useState } from 'react';

import { COLORS } from '@constants';

import { CATEGORIES } from '@constants';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';

export interface ICategories {
  onSelect: (ids: number[]) => void;
  select: number[];
}

const Categories = ({ onSelect }: ICategories) => {
  const [select, setSelect] = useState<number[]>([]);

  const handlePressTag = (id: number) => {
    setSelect((prev) => {
      const newTags = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      onSelect(newTags);

      return newTags;
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.contentContainerStyle}
      >
        {CATEGORIES.map(({ name, id }, idx) => {
          const isActive = select.includes(id);

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
              onPress={() => handlePressTag(id)}
            >
              <Text style={styles.textButton}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </GestureHandlerRootView>
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
    backgroundColor: COLORS.LIGHT_GREEN,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
  button: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  textButton: {
    fontSize: 13,
  },
});
