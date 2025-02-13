import { useContext } from 'react';

import {
  FiltersActionContext,
  FiltersContext,
} from '@contexts/filters/provider';

import Categories from '@components/Categories';

const FoodCategories = () => {
  console.log('FoodCategories');
  const categories = useContext(FiltersContext);
  const setCategories = useContext(FiltersActionContext);

  return <Categories onSelect={setCategories} select={categories} />;
};

export default FoodCategories;
