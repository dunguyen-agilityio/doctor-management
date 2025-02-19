import { LinearGradient } from 'expo-linear-gradient';

import { IInfo } from './common';

export type Ingredients = 'Bread' | 'Meat (Chicken)' | 'Cucumber' | 'Onion';

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

export interface ICategory {
  id: string;
  name: Categories;
}

export type TIngredient = IInfo & {
  name: Ingredients;
  value: number;
};

export type TNutritional = {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

export interface IArticle extends IInfo {
  image: string;
  title: string;
  color: 'green' | 'secondary';
  backgroundColor: LinearGradient['props']['colors'];
}

export interface IFood extends IInfo {
  category: string;
  weight: number;
  color:
    | 'WHITE'
    | 'LIGHT_GRAY'
    | 'GRAY'
    | 'ORANGE'
    | 'GREEN'
    | 'BLACK'
    | 'YELLOW'
    | 'RED'
    | 'PURPLE'
    | 'DEFAULT'
    | 'LIGHT_GREEN'
    | 'LIGHT_BLACK'
    | 'PRIMARY'
    | 'SECONDARY';
  desc: string;
  imgUrl: string;
  favorite: boolean;
  nutritional: TNutritional;
  ingredients: TIngredient[];
  favoriteId?: string;
}
