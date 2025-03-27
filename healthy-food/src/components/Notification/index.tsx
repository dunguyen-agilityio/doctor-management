import Toast from 'react-native-toast-message';

import useNotify from '@/hooks/useNotify';

const Notification = () => {
  useNotify();

  return <Toast />;
};

export default Notification;
