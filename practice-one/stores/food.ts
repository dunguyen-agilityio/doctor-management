import { create } from 'zustand';

import { IFood } from '@types';

export interface FoodState {
  foods: IFood[];
  allIds: number[];
  byId: Record<number, IFood>;
  favoriteIds: number[];
}
interface FoodActions {
  setFoods: (foods: IFood[], isFavorite?: boolean) => void;
  setFood: (food: IFood) => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}
export const DEFAULT_FOOD_STATE: FoodState = {
  foods: [],
  allIds: [],
  byId: {},
  favoriteIds: [],
};

export const useFoodsStore = create<FoodState & FoodActions>((set) => ({
  ...DEFAULT_FOOD_STATE,
  setFoods: (foods: IFood[], isFavorite?: boolean) => {
    set(({ byId }) => {
      // const prevIds = isFavorite ? favoriteIds : allIds;
      const ids = foods.map((item) => {
        byId[item.id] = item;
        return item.id;
      });

      // const newAllIds = Array.from(new Set([...prevIds, ...ids]));

      return {
        foods,
        [isFavorite ? 'favoriteIds' : 'allIds']: ids,
        byId,
      };
    });
  },
  setFood: (food: IFood) => {
    set(({ byId }) => {
      byId[food.id] = food;
      return { byId };
    });
  },
  addFavorite: (id) => {
    set(({ byId, favoriteIds }) => {
      const set = new Set(favoriteIds);
      if (!set.has(id)) favoriteIds.push(id);
      return { byId, favoriteIds };
    });
  },
  removeFavorite: (id) => {
    set(({ byId, favoriteIds }) => {
      const set = new Set(favoriteIds);
      if (set.has(id)) {
        set.delete(id);
      }
      return { byId, favoriteIds: Array.from(set) };
    });
  },
}));

export const idsSelector = ({ allIds }: FoodState) => allIds;

export const favoriteIdsSelector = ({ favoriteIds }: FoodState) => favoriteIds;
