import { LinearGradient } from 'expo-linear-gradient';

export type Categories =
  | 'Fast Food'
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Fruits'
  | 'Vegetables'
  | 'Dry fruits'
  | 'Non-Veg'
  | 'Greenish';

export type TOption<T = string> = {
  value: T;
  name: string;
};

export type TIngredient = {
  id: string;
  name: string;
  value: number;
};

export type TNutritional = {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

export interface IArticle {
  id: string;
  image: string;
  title: string;
  color: 'primary' | 'secondary';
  backgroundColor: LinearGradient['props']['colors'];
}

export enum FOOD_COLOR {
  'ORANGE' = 'ORANGE',
  'GREEN' = 'GREEN',
  'YELLOW' = 'YELLOW',
  'RED' = 'RED',
  'PURPLE' = 'PURPLE',
}

export interface IFood {
  id: string;
  name: string;
  category: string;
  weight: number;
  color: FOOD_COLOR;
  desc: string;
  imgUrl: string;
  favorite: boolean;
  nutritional: TNutritional;
  ingredients: TIngredient[];
  favoriteId?: string;
}
