import { Image } from 'expo-image';

import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { TabParamsList } from '@/navigation';

import { APP_ICONS, ROUTES } from '@/constants';

const TabIcon = ({
  focused,
  name,
}: {
  focused: boolean;
  name: keyof TabParamsList;
}) => {
  const ICON_BY_ROUTE: Record<keyof TabParamsList, APP_ICONS> = {
    [ROUTES.FAVORITE]: focused ? APP_ICONS.FAVORITE_FILL : APP_ICONS.FAVORITE,
    [ROUTES.HOME]: focused ? APP_ICONS.HOME_FILL : APP_ICONS.HOME,
    [ROUTES.SEARCH]: focused
      ? APP_ICONS.SEARCH_MENU_FILL
      : APP_ICONS.SEARCH_MENU,
  };

  const icon = ICON_BY_ROUTE[name];

  if (!icon) return null;

  return (
    <Image
      source={icon}
      style={styles.icon}
      contentFit="contain"
      testID="tab-icon-image"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default memo(TabIcon);
