import { create } from 'zustand';

export interface FilterState {
  query: string;
  favoriteQuery: string;
  categories: number[];
}
interface FilterActions {
  setFilter: (filter: Partial<FilterState>) => void;
}
export const DEFAULT_FILTER_STATE: FilterState = {
  categories: [],
  query: '',
  favoriteQuery: '',
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...DEFAULT_FILTER_STATE,
  setFilter: set,
}));

export const querySelector = ({ query }: FilterState) => query;

export const favoriteQuerySelector = ({ favoriteQuery }: FilterState) =>
  favoriteQuery;
