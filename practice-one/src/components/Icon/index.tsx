import { memo } from 'react';
import { Image, ImageProps } from 'react-native';

export enum APP_ICONS {
  EMPTY = require('@assets/images/empty.png'),
  NOT_FOUND = require('@assets/images/not-found.png'),
  LOGO = require('@assets/images/logo.png'),
  ARROW_RIGHT_BOLD = require('@assets/icons/arrow-right-bold.png'),
  ARROW_LEFT = require('@assets/icons/arrow-left.png'),
  QUESTION = require('@assets/icons/question.png'),
  SEARCH = require('@assets/icons/icon-search.png'),
  FAVORITE = require('@assets/icons/favorite.png'),
  FAVORITE_FILL = require('@assets/icons/favorite-fill.png'),
  HOME = require('@assets/icons/home.png'),
  HOME_FILL = require('@assets/icons/home-fill.png'),
  SEARCH_MENU = require('@assets/icons/search.png'),
  SEARCH_MENU_FILL = require('@assets/icons/search-fill.png'),
  SPLASH = require('@assets/images/pattern.png'),
}

type IconProps = ImageProps & { source: APP_ICONS };

export const Icon = memo(({ source, ...props }: IconProps) => (
  <Image source={source} {...props} />
));

Icon.displayName = 'Icon';
