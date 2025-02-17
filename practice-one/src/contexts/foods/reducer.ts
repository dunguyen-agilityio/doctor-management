import { produce } from 'immer';

import { IFood } from '@/types';

export type FoodsState = { foods: IFood[] | null };

export type FoodsAction = {
  type: 'GET_FOODS';
  payload: IFood[];
};

export const DEFAULT_FOODS_STATE: FoodsState = { foods: null };

export const foodsReducer = (state: FoodsState, actions: FoodsAction) => {
  return produce(state, (draftState) => {
    switch (actions.type) {
      case 'GET_FOODS':
        draftState.foods = actions.payload;
        break;

      default:
        break;
    }
  });
};
