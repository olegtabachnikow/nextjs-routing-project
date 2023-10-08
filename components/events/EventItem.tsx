import { FC } from 'react';
import classes from './eventItem.module.css';
import Button from '../ui/Button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import { EventDataType } from '@/helpers/api-util';
import Image from 'next/image';

interface EventItemProps {
  item: EventDataType;
}

const EventItem: FC<EventItemProps> = ({ item }) => {
  const humanReadableDate = new Date(item.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = item.location.replace(', ', '\n');
  const exploreLink = `/events/${item.id}`;
  return (
    <li className={classes.item}>
      <Image src={'/' + item.image} alt={item.title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{item.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
          <div className={classes.actions}>
            <Button link={exploreLink}>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
