import { Image, ImageProps } from 'react-native';

import { WINDOW_WIDTH } from '@/constants/dimensions';

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

export const Icon = ({ source, ...props }: IconProps) => (
  <Image source={source} {...props} />
);

// Using the reusable Icon component
export const EmptyImage = () => (
  <Icon source={APP_ICONS.EMPTY} style={{ width: 108, height: 96 }} />
);
export const NotFoundImage = () => (
  <Icon
    source={APP_ICONS.NOT_FOUND}
    testID="not-found-image"
    style={{ width: 96, height: 96 }}
  />
);
export const Logo = () => (
  <Icon source={APP_ICONS.LOGO} style={{ width: 122, height: 122 }} />
);
export const ArrowRightBoldIcon = () => (
  <Icon source={APP_ICONS.ARROW_RIGHT_BOLD} />
);
export const QuestionIcon = () => <Icon source={APP_ICONS.QUESTION} />;
export const SearchIcon = () => <Icon source={APP_ICONS.SEARCH} />;

// Conditional Icons
export const FavoriteMenu = ({ isFill = false }: { isFill?: boolean }) => (
  <Icon source={isFill ? APP_ICONS.FAVORITE_FILL : APP_ICONS.FAVORITE} />
);
export const HomeMenu = ({ isFill = false }: { isFill?: boolean }) => (
  <Icon source={isFill ? APP_ICONS.HOME_FILL : APP_ICONS.HOME} />
);
export const SearchMenu = ({ isFill = false }: { isFill?: boolean }) => (
  <Icon source={isFill ? APP_ICONS.SEARCH_MENU_FILL : APP_ICONS.SEARCH_MENU} />
);

export const SplashImage = () => (
  <Icon
    source={APP_ICONS.SPLASH}
    resizeMode="cover"
    style={{ width: WINDOW_WIDTH }}
  />
);

export const ArrowLeft = () => <Icon source={APP_ICONS.ARROW_LEFT} />;
