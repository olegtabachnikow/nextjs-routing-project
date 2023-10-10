import { useContext, FC } from 'react';
import classes from './Notification.module.css';
import {
  NotificationContext,
  NotificationItem,
} from '../../store/notification-context';

const Notification: FC<NotificationItem> = ({ title, message, status }) => {
  const notificationCtx = useContext(NotificationContext);
  function hideNotificationHandler() {
    notificationCtx.notification?.status !== 'pending' &&
      notificationCtx.hideNotification();
  }
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotificationHandler}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
