import notifee, {
  AndroidStyle,
  AuthorizationStatus,
} from '@notifee/react-native';
import messaging, {
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

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
      // Note that an async function or a function that returns a Promise
      // is required for both subscribers.
      async function onMessageReceived(
        message: FirebaseMessagingTypes.RemoteMessage,
      ) {
        if (!message.notification) return;

        const { title, body, android } = message.notification;

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId,
            largeIcon: android?.imageUrl,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: 'default',
            },
            style: {
              type: AndroidStyle.BIGPICTURE,
              picture: android?.imageUrl ?? '',
            },
          },
        });
      }

      const unsubscribe = messaging().onMessage(onMessageReceived);
      messaging().setBackgroundMessageHandler(onMessageReceived);

      return () => {
        unsubscribe();
      };
    }
  }, [token]);
};

export default useNotify;
