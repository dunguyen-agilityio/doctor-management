import notifee, {
  AndroidStyle,
  AuthorizationStatus,
} from '@notifee/react-native';
import messaging, {
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import { useEffect, useState } from 'react';

const useNotify = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function onDisplayNotification() {
      try {
        // Request permissions (required for iOS)
        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
          // Register the device with FCM
          await messaging().registerDeviceForRemoteMessages();

          // Get the token
          const token = await messaging().getToken();

          // Save the token
          setToken(token);
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    onDisplayNotification();
  }, []);

  useEffect(() => {
    if (token) {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        if (!remoteMessage.notification) return;
        const { title, body } = remoteMessage.notification;

        // Display an alert when app is in foreground
        Toast.show({
          type: 'info',
          text1: title,
          text2: body,
        });
      });

      // Handle notification tap (background or terminated state)
      messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage) {
          console.log('Handle notification tap: ', remoteMessage);
        }
      });

      // Handle app opened from terminated state via notification
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log('remoteMessage', remoteMessage);
          }
        });

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        if (!remoteMessage.notification) return;

        // You can't directly navigate here, but you can process data or trigger something
        // For navigation, rely on onNotificationOpenedApp or getInitialNotification

        const { title, body } = remoteMessage.notification;

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId,
            // largeIcon: android?.imageUrl,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: 'default',
            },
            // style: {
            //   type: AndroidStyle.BIGPICTURE,
            //   picture: android?.imageUrl ?? '',
            // },
          },
        });
      });

      return unsubscribe;
    }
  }, [token]);
};

export default useNotify;
