import { FC, ReactNode } from 'react';
import classes from './EventContent.module.css';

interface EventContentProps {
  children: ReactNode;
}

const EventContent: FC<EventContentProps> = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
