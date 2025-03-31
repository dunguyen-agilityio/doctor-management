import { create } from 'zustand';

import { IFood } from '@/types';

export const useFoodStore = create<{
  food: IFood | null;
  setFood: (food: IFood) => void;
}>((set) => ({
  food: null,
  setFood: (food: IFood) => {
    set({ food });
  },
}));
