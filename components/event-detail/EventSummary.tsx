import { FC } from 'react';
import classes from './EventSummary.module.css';

interface EventSummaryProps {
  title: string;
}

const EventSummary: FC<EventSummaryProps> = ({ title }) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
