import { useCallback } from 'react';

import Categories from '@components/Categories';

import { useFilterStore } from '@stores/filter';

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
