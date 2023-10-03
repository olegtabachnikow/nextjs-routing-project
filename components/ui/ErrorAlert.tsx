import { FC, ReactNode } from 'react';
import classes from './ErrorAlert.module.css';

interface ErrorAlertProps {
  children: ReactNode;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
