import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { EventDataType, getAllEvents } from '@/helpers/api-util';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Head from 'next/head';

interface Props {
  events: EventDataType[];
}

const AllEventsPage: FC<Props> = ({ events }) => {
  const router = useRouter();
  function findEventsHandler(year: string, month: string) {
    router.push(`/events/${year}/${month}`);
  }
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name='description' content='All events' />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
}
