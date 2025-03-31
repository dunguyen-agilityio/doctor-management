import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Image } from 'expo-image';

import type { TabParamsList } from '@/types';

import { ROUTES } from '@/route';

import { APP_ICON } from '@/icons';

const TabIcon = ({
  focused,
  name,
}: {
  focused: boolean;
  name: keyof TabParamsList;
}) => {
  const ICON_BY_ROUTE: Record<keyof TabParamsList, APP_ICON> = {
    [ROUTES.FAVORITE]: focused ? APP_ICON.FAVORITE_FILL : APP_ICON.FAVORITE,
    [ROUTES.HOME]: focused ? APP_ICON.HOME_FILL : APP_ICON.HOME,
    [ROUTES.SEARCH]: focused ? APP_ICON.SEARCH_MENU_FILL : APP_ICON.SEARCH_MENU,
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
