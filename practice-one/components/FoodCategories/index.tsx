import Categories from '@components/Categories';
import { useFilterStore } from '@stores/filter';
import React, { useCallback } from 'react';

const FoodCategories = () => {
  const { categories, setFilter } = useFilterStore();
  const handleChangeTag = useCallback(
    (ids: number[]) => {
      setFilter({ categories: ids });
    },
    [setFilter],
  );

  return <Categories onSelect={handleChangeTag} select={categories} />;
};

export default FoodCategories;
