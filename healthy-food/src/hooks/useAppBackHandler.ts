import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

import { navigationRef } from '@/navigation';

import { ROUTES } from '@/routes';

export const useAppBackHandler = () => {
  useEffect(() => {
    const backAction = () => {
      const isHomeScreen =
        navigationRef.current?.getCurrentRoute()?.name === ROUTES.HOME;

      if (isHomeScreen) {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);

        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};
