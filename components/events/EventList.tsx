import { FC } from 'react';
import type { DummyDataType } from '@/data/dummy-data';
import EventItem from './EventItem';
import classes from './EventList.module.css';

interface EventListProps {
  items: DummyDataType[];
}

const EventList: FC<EventListProps> = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
