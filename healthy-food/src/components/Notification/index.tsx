import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  type FirebaseMessagingTypes,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  registerDeviceForRemoteMessages,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import notifee, {
  AndroidStyle,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';

import { navigationRef } from '@/navigation';

import { ROUTES } from '@/routes';

import { APP_ICON } from '@/icons';

type FoodNotification = { type: 'NAVIGATE_TO_FOOD'; data: string };

const messaging = getMessaging();

const Notification = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function onDisplayNotification() {
      try {
        // Request permissions (required for iOS)
        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
          // Register the device with FCM
          registerDeviceForRemoteMessages(messaging);

          // Get the token
          const token = await getToken(messaging);

          // Save the token
          setToken(token);
        }
      } catch (error) {
        let errorMessage = 'Failed to register device for remote messages';

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        Alert.alert('Error', errorMessage);
      }
    }

    onDisplayNotification();

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      // Check if the user pressed the "Mark as read" action
      if (
        type === EventType.ACTION_PRESS &&
        pressAction?.id === 'mark-as-read'
      ) {
        // TODO: Update external API

        if (notification?.id) {
          // Remove the notification
          await notifee.cancelNotification(notification.id);
        }
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleBackground = async (
      remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    ) => {
      if (!remoteMessage.notification) return;

      const { title, body, android } = remoteMessage.notification;

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        id: Date.now().toString(),
        title,
        body,
        android: {
          channelId,
          largeIcon: android?.imageUrl ?? APP_ICON.NOTIFICATION,
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: android?.imageUrl ?? APP_ICON.NOTIFICATION,
          },
        },
      });
    };
    const handleTapNotification = (
      remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    ) => {
      if (!remoteMessage.data) {
        return;
      }

      // Process the data received in the notification
      const { type, data } = remoteMessage.data as FoodNotification;

      switch (type) {
        case 'NAVIGATE_TO_FOOD':
          navigationRef.navigate(ROUTES.DETAIL, { id: data });
          break;

        default:
          break;
      }
    };

    const handleForeground = async (
      remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    ) => {
      if (!remoteMessage.notification) return;

      const { title, body } = remoteMessage.notification;

      // Display an alert when app is in foreground
      Toast.show({
        type: 'info',
        text1: title,
        text2: body,
        swipeable: true,
        onPress: () => handleTapNotification(remoteMessage),
      });
    };

    if (token) {
      console.log('token', token);
      // Handle notification tap (background or terminated state)
      onNotificationOpenedApp(messaging, handleTapNotification);
      // Handle background notification
      setBackgroundMessageHandler(messaging, handleBackground);
      // Handle listen Foreground notification
      const unsubscribe = onMessage(messaging, handleForeground);

      return unsubscribe;
    }
  }, [token]);

  return <Toast />;
};

export default Notification;
