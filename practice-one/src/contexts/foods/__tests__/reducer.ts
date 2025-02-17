import { IFood } from '@/types';

import { MOCK_FOODS } from '@/mocks';

import {
  DEFAULT_FOODS_STATE,
  FoodsAction,
  FoodsState,
  foodsReducer,
} from '../reducer';

describe('foodsReducer', () => {
  it('should return the default state when no action is provided', () => {
    const newState = foodsReducer(DEFAULT_FOODS_STATE, {
      type: '',
    } as unknown as FoodsAction);
    expect(newState).toEqual(DEFAULT_FOODS_STATE);
  });

  it('should update the state with the provided foods when GET_FOODS action is dispatched', () => {
    const action: FoodsAction = { type: 'GET_FOODS', payload: MOCK_FOODS };
    const newState = foodsReducer(DEFAULT_FOODS_STATE, action);

    expect(newState).toEqual({ foods: MOCK_FOODS });
  });

  it('should not mutate the previous state', () => {
    const mockFoods: IFood[] = [...MOCK_FOODS];
    const action: FoodsAction = { type: 'GET_FOODS', payload: mockFoods };

    const prevState: FoodsState = { foods: [] };
    const newState = foodsReducer(prevState, action);

    expect(newState).not.toBe(prevState);
  });
});
