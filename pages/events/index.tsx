import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { getAllEvents } from '@/data/dummy-data';
import { useRouter } from 'next/router';
import { FC } from 'react';

const AllEventsPage: FC = () => {
  const events = getAllEvents();
  const router = useRouter();
  function findEventsHandler(year: string, month: string) {
    router.push(`/events/${year}/${month}`);
  }
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
