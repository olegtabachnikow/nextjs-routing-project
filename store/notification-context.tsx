import { ReactNode, createContext, useEffect, useState } from 'react';

export type NotificationItem = {
  title: string;
  message: string;
  status: 'error' | 'pending' | 'success';
};

const initialNotification: NotificationItem = {
  title: '',
  message: '',
  status: 'pending',
};

type NotificationContextType = {
  notification: NotificationItem | null;
  showNotification: (notificationData: NotificationItem) => void;
  hideNotification: () => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notification: initialNotification,
  showNotification: function (notificationData: NotificationItem) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationItem | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timeout = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: NotificationItem) {
    setActiveNotification(notificationData);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
