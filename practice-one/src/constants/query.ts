export const QUERY_KEYS = {
  FOOD: 'food-list',
  HOME_FOOD: 'food-list-home',
  SEARCH_FOOD: 'food-list-search',
  FAVORITE_FOOD: 'food-list-favorite',
  FOOD_BY_ID: (id: string) => `food-${id}`,
};

export const PAGE_SIZE = 20;
