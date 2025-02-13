import React from 'react';
import { createContext } from 'react';

import { useImmerReducer } from 'use-immer';

import { foodsReducer } from './reducer';
import { FoodsAction, FoodsState } from './reducer';

export const DEFAULT_FOODS_STATE: FoodsState = { byId: {}, ids: [] };

export const FoodsContext = createContext(DEFAULT_FOODS_STATE);
export const FoodsDispatchContext = createContext<React.Dispatch<FoodsAction>>(
  () => {},
);

const FoodsProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useImmerReducer(foodsReducer, DEFAULT_FOODS_STATE);

  return (
    <FoodsContext.Provider value={state}>
      <FoodsDispatchContext.Provider value={dispatch}>
        {children}
      </FoodsDispatchContext.Provider>
    </FoodsContext.Provider>
  );
};

export default FoodsProvider;
