import { create } from 'zustand';
import { IFood } from '@types';

interface FoodState {
  foods: IFood[];
}
interface FoodActions {
  getFoods: (foods: IFood[]) => void;
  getFood: (food: IFood) => void;
}
export const DEFAULT_FOOD_STATE: FoodState = {
  foods: [],
};

export const useFoods = create<FoodState & FoodActions>((set) => ({
  ...DEFAULT_FOOD_STATE,
  getFoods: (foods: IFood[]) => {
    set({ foods });
  },
  getFood: (food: IFood) => {
    set((prev) => {
      const { foods } = prev;

      const current = foods.find(({ id }) => food.id === id);
      if (current) {
        Object.assign(current, food);
      } else {
        foods.push(food);
      }

      return { foods };
    });
  },
}));
