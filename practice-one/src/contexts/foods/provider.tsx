import { useImmerReducer } from 'use-immer';

import { createContext } from 'react';

import { DEFAULT_FOODS_STATE, foodsReducer } from './reducer';
import { FoodsAction } from './reducer';

export const FoodsContext = createContext(DEFAULT_FOODS_STATE);
export const FoodsDispatchContext = createContext<React.Dispatch<FoodsAction>>(
  () => {},
);

export const FoodsProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useImmerReducer(foodsReducer, DEFAULT_FOODS_STATE);

  return (
    <FoodsContext.Provider value={state}>
      <FoodsDispatchContext.Provider value={dispatch}>
        {children}
      </FoodsDispatchContext.Provider>
    </FoodsContext.Provider>
  );
};
