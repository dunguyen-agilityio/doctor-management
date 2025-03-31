import { useEffect } from 'react';

import {
  addEventListener as linkingAddEventListener,
  parse as linkingParse,
} from 'expo-linking';

import { navigationRef } from '@/navigation';

import { ROUTES } from '@/route';

const handleDeepLink = (url: string): void => {
  const { hostname, path, queryParams } = linkingParse(url);
  const params = queryParams ?? {};

  switch (hostname) {
    case ROUTES.DETAIL:
      if (!path) return;
      navigationRef.navigate(ROUTES.DETAIL, { id: path });
      break;

    case ROUTES.FAVORITE:
      navigationRef.navigate(ROUTES.FAVORITE);
      break;

    case ROUTES.SEARCH:
      if (params.categories && typeof params.categories === 'string') {
        params.categories = params.categories.split(',');
      }
      navigationRef.navigate(ROUTES.SEARCH, params);
      break;

    default:
      break;
  }
};

export const useAppLinking = () => {
  useEffect(() => {
    const handleLinkingListener = ({ url }: { url: string }) => {
      if (navigationRef.isReady()) handleDeepLink(url);
    };

    // Listen for deep links when app is opened
    const subscribe = linkingAddEventListener('url', handleLinkingListener);

    return () => {
      subscribe.remove();
    };
  }, []);

  return handleDeepLink;
};
