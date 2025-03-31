import { useContext } from 'react';

import type { TStateDispatchAction } from '@/types';

import { FocusContext, FocusDispatchContext } from '@/contexts/focus';

export const useFocus = (): TStateDispatchAction<boolean> => {
  const focus = useContext(FocusContext);
  const dispatch = useContext(FocusDispatchContext);

  return [focus, dispatch];
};
