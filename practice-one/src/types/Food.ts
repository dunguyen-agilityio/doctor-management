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

export interface ICategory {
  id: string;
  name: Categories;
}

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

export interface IFood {
  id: string;
  name: string;
  category: string;
  weight: number;
  color: 'ORANGE' | 'GREEN' | 'YELLOW' | 'RED' | 'PURPLE';
  desc: string;
  imgUrl: string;
  favorite: boolean;
  nutritional: TNutritional;
  ingredients: TIngredient[];
  favoriteId?: string;
}
