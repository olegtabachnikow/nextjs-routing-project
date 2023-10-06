import { FC } from 'react';
import { EventDataType } from '@/helpers/api-util';
import EventItem from './EventItem';
import classes from './EventList.module.css';

interface EventListProps {
  items: EventDataType[];
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
