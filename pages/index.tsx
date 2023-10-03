import { FC } from 'react';
import { getFeaturedEvents } from '@/data/dummy-data';
import EventList from '@/components/events/EventList';

const HomePage: FC = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
