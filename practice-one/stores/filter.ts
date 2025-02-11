import { create } from 'zustand';

interface FilterState {
  query: string;
  categories: number[];
}
interface FilterActions {
  setFilter: (filter: Partial<FilterState>) => void;
}
export const DEFAULT_FILTER_STATE: FilterState = {
  categories: [],
  query: '',
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...DEFAULT_FILTER_STATE,
  setFilter: set,
}));
