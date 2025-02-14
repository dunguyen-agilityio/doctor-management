import { IFood } from '@/types';

export type FoodsState = { foods: IFood[] };

export type FoodsAction = {
  type: 'GET_FOODS';
  payload: IFood[];
};

export const DEFAULT_FOODS_STATE: FoodsState = { foods: [] };

export const foodsReducer = (state: FoodsState, actions: FoodsAction) => {
  switch (actions.type) {
    case 'GET_FOODS':
      state.foods = actions.payload;
      break;

    default:
      break;
  }
};
